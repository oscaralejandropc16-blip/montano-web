"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud, Image as ImageIcon, Search } from "lucide-react";
import { getCloudinaryMedia } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

export default function MediaSelector({ 
  isOpen, 
  onClose, 
  onSelect 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSelect: (url: string) => void;
}) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'gallery' | 'upload'>('gallery');

  useEffect(() => {
    if (isOpen && tab === 'gallery' && media.length === 0) {
      setLoading(true);
      getCloudinaryMedia().then(data => {
        setMedia(data);
        setLoading(false);
      });
    }
  }, [isOpen, tab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" /> Seleccionar Imagen
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 border-b border-gray-100 bg-gray-50/50">
          <button 
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'gallery' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-black'}`}
            onClick={() => setTab('gallery')}
          >
            Galería (Cloudinary)
          </button>
          <button 
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${tab === 'upload' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-black'}`}
            onClick={() => setTab('upload')}
          >
            Subir Nueva
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          {tab === 'gallery' ? (
            loading ? (
              <div className="flex items-center justify-center h-64 text-gray-400">Cargando medios...</div>
            ) : media.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                <p>No hay imágenes en la galería.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {media.map(item => (
                  <div 
                    key={item.public_id} 
                    onClick={() => {
                      onSelect(item.secure_url);
                      onClose();
                    }}
                    className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-all group relative"
                  >
                    {item.resource_type === 'video' ? (
                      <video src={item.secure_url} className="w-full h-full object-cover" />
                    ) : (
                      <img src={item.secure_url} className="w-full h-full object-cover" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Seleccionar</div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-64">
              <CldUploadWidget 
                uploadPreset="ml_default"
                options={{ resourceType: "auto" }}
                onSuccess={(res: any) => {
                  onSelect(res.info.secure_url);
                  onClose();
                }}
              >
                {(props: any) => {
                  const open = props?.open;
                  return (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (open) open();
                      }}
                      className="bg-black text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-primary transition-colors flex items-center gap-3 shadow-xl"
                    >
                      <UploadCloud className="w-6 h-6" /> Abrir Ventana de Subida
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
