"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from "lucide-react";
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

export default function ProductosClient({ initialProducts, dbCategories, dbBrands }: { initialProducts: any[], dbCategories?: any[], dbBrands?: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const defaultCats = dbCategories && dbCategories.length > 0 ? dbCategories.map(c => c.name) : ["Jamones", "Ahumados", "Fiambres", "Especialidades"];
  const defaultBrands = dbBrands && dbBrands.length > 0 ? dbBrands.map(b => b.name) : ["Montano Antilia", "Vicosa", "Don Vincenzo", "Delium"];

  const [formData, setFormData] = useState({
    name: "", brand: defaultBrands[0] || "Montano Antilia", category: defaultCats[0] || "Jamones", tag: "", description: "", ingredients: "", preservation: "", image_url: "", nutrition_url: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (prod: any = null) => {
    if (prod) {
      setEditingId(prod.id);
      setFormData({
        name: prod.name, brand: prod.brand || "Montano Antilia", category: prod.category, tag: prod.tag || "",
        description: prod.description || "", ingredients: prod.ingredients || "",
        preservation: prod.preservation || "", image_url: prod.image_url || "", nutrition_url: prod.nutrition_url || ""
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", brand: defaultBrands[0] || "Montano Antilia", category: defaultCats[0] || "Jamones", tag: "", description: "", ingredients: "", preservation: "", image_url: "", nutrition_url: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } : p));
      } else {
        await createProduct(formData);
        // Recargar la página simple para actualizar ID
        window.location.reload();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.")) {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Foto</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Nombre</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Categoría</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Formato</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">No hay productos registrados.</td></tr>
            ) : (
              products.map(prod => (
                <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                      {prod.image_url ? (
                        <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-black">{prod.name}</td>
                  <td className="p-4"><span className="bg-black/5 px-3 py-1 rounded-full text-xs font-bold tracking-wider">{prod.category}</span></td>
                  <td className="p-4 text-gray-500 text-sm">{prod.tag}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(prod)} className="p-2 text-gray-400 hover:text-black transition-colors bg-white border border-gray-200 rounded-lg shadow-sm">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(prod.id)} className="p-2 text-gray-400 hover:text-primary transition-colors bg-white border border-gray-200 rounded-lg shadow-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 p-8 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-extrabold text-black mb-8">{editingId ? 'Editar Producto' : 'Crear Producto'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex gap-6">
                <div className="w-1/3 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto Principal</label>
                    <CldUploadWidget 
                      uploadPreset="ml_default"
                      onSuccess={(result: any) => setFormData({...formData, image_url: result.info.secure_url})}
                    >
                      {({ open }) => (
                        <div 
                          onClick={() => open()}
                          className="w-full aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer overflow-hidden relative"
                        >
                          {formData.image_url ? (
                            <img src={formData.image_url} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <>
                              <ImageIcon className="w-8 h-8 mb-2" />
                              <span className="text-xs font-bold text-center">Subir Foto<br/>Principal</span>
                            </>
                          )}
                        </div>
                      )}
                    </CldUploadWidget>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Info Nutricional</label>
                    <CldUploadWidget 
                      uploadPreset="ml_default"
                      onSuccess={(result: any) => setFormData({...formData, nutrition_url: result.info.secure_url})}
                    >
                      {({ open }) => (
                        <div 
                          onClick={() => open()}
                          className="w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer overflow-hidden relative"
                        >
                          {formData.nutrition_url ? (
                            <img src={formData.nutrition_url} className="absolute inset-0 w-full h-full object-contain bg-gray-50" alt="Nutricional" />
                          ) : (
                            <>
                              <ImageIcon className="w-6 h-6 mb-1" />
                              <span className="text-xs font-bold text-center">Subir Tabla<br/>Nutricional</span>
                            </>
                          )}
                        </div>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
                
                <div className="w-2/3 space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Marca *</label>
                      <select 
                        required 
                        value={formData.brand} 
                        onChange={e => setFormData({...formData, brand: e.target.value})} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer" 
                      >
                        <option value="" disabled>Selecciona una marca...</option>
                        {Array.from(new Set([...products.map(p => p.brand).filter(Boolean), ...defaultBrands])).map(brand => (
                          <option key={brand as string} value={brand as string}>{brand as string}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nombre del Producto *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Categoría *</label>
                      <select 
                        required 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer" 
                      >
                        <option value="" disabled>Selecciona una categoría...</option>
                        {Array.from(new Set([...products.map(p => p.category).filter(Boolean), ...defaultCats])).map(cat => (
                          <option key={cat as string} value={cat as string}>{cat as string}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Formato (Ej. Cilindro 3Kg)</label>
                      <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Descripción Larga</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"></textarea>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Ingredientes</label>
                  <textarea rows={2} value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"></textarea>
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Conservación</label>
                  <textarea rows={2} value={formData.preservation} onChange={e => setFormData({...formData, preservation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"></textarea>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-primary transition-colors shadow-lg">
                  {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
