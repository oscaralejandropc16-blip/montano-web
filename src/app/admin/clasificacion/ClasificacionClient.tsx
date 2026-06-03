"use client";

import { useState } from "react";
import { Plus, Trash2, Tag, Bookmark, Edit2, Image as ImageIcon, X } from "lucide-react";
import { createCategory, deleteCategory, updateCategory, createBrand, deleteBrand, updateBrand } from "@/lib/actions";
import ConfirmModal from "@/components/ConfirmModal";
import { CldUploadWidget } from "next-cloudinary";

export default function ClasificacionClient({ initialCategories, initialBrands }: { initialCategories: {id: number, name: string}[], initialBrands: {id: number, name: string, logo_url?: string}[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [brands, setBrands] = useState(initialBrands);

  const [newCat, setNewCat] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [loading, setLoading] = useState(false);

  // Modales
  const [deleteCatId, setDeleteCatId] = useState<number | null>(null);
  const [deleteBrandId, setDeleteBrandId] = useState<number | null>(null);

  const [editCat, setEditCat] = useState<{id: number, name: string} | null>(null);
  const [editBrand, setEditBrand] = useState<{id: number, name: string, logo_url?: string} | null>(null);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat) return;
    setLoading(true);
    await createCategory(newCat);
    setNewCat("");
    window.location.reload();
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand) return;
    setLoading(true);
    await createBrand(newBrand);
    setNewBrand("");
    window.location.reload();
  };

  const confirmDeleteCategory = async () => {
    if (!deleteCatId) return;
    setLoading(true);
    await deleteCategory(deleteCatId);
    setCategories(categories.filter(c => c.id !== deleteCatId));
    setDeleteCatId(null);
    setLoading(false);
  };

  const confirmDeleteBrand = async () => {
    if (!deleteBrandId) return;
    setLoading(true);
    await deleteBrand(deleteBrandId);
    setBrands(brands.filter(b => b.id !== deleteBrandId));
    setDeleteBrandId(null);
    setLoading(false);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCat) return;
    setLoading(true);
    await updateCategory(editCat.id, editCat.name);
    setCategories(categories.map(c => c.id === editCat.id ? editCat : c));
    setEditCat(null);
    setLoading(false);
  };

  const handleUpdateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBrand) return;
    setLoading(true);
    await updateBrand(editBrand.id, editBrand.name, editBrand.logo_url || null);
    setBrands(brands.map(b => b.id === editBrand.id ? editBrand : b));
    setEditBrand(null);
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-black tracking-tight mb-2">Clasificación</h1>
        <p className="text-gray-500 text-sm">Gestiona las categorías y marcas disponibles para tus productos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Categorías */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Tag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-black">Categorías</h2>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
            <input 
              type="text" 
              required
              value={newCat}
              onChange={e => setNewCat(e.target.value)}
              placeholder="Nueva categoría..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-primary"
            />
            <button disabled={loading} type="submit" className="bg-black text-white px-6 rounded-xl hover:bg-primary transition-colors flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-3">
            {categories.map(c => (
              <div key={c.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-medium text-black text-sm">{c.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditCat(c)} className="text-gray-400 hover:text-black transition-colors p-1">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteCatId(c.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No hay categorías</p>}
          </div>
        </div>

        {/* Marcas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-black">
              <Bookmark className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-black">Marcas</h2>
          </div>

          <form onSubmit={handleAddBrand} className="flex gap-4 mb-8">
            <input 
              type="text" 
              required
              value={newBrand}
              onChange={e => setNewBrand(e.target.value)}
              placeholder="Nueva marca..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-primary"
            />
            <button disabled={loading} type="submit" className="bg-black text-white px-6 rounded-xl hover:bg-primary transition-colors flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-3">
            {brands.map(b => (
              <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  {b.logo_url ? (
                    <img src={b.logo_url} alt={b.name} className="w-8 h-8 object-contain rounded-md bg-white border border-gray-200 p-1" />
                  ) : (
                    <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <span className="font-medium text-black text-sm">{b.name}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditBrand(b)} className="text-gray-400 hover:text-black transition-colors p-1">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteBrandId(b.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {brands.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No hay marcas</p>}
          </div>
        </div>

      </div>

      {/* Edit Category Modal */}
      {editCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
            <button onClick={() => setEditCat(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-black mb-4">Editar Categoría</h3>
            <form onSubmit={handleUpdateCategory} className="flex flex-col gap-4">
              <input 
                type="text" required
                value={editCat.name} onChange={e => setEditCat({...editCat, name: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-primary"
              />
              <button disabled={loading} type="submit" className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Brand Modal */}
      {editBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
            <button onClick={() => setEditBrand(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-black mb-4">Editar Marca</h3>
            <form onSubmit={handleUpdateBrand} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Nombre</label>
                <input 
                  type="text" required
                  value={editBrand.name} onChange={e => setEditBrand({...editBrand, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Logo de la Marca</label>
                {editBrand.logo_url && (
                  <div className="mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-center">
                    <img src={editBrand.logo_url} alt="Logo" className="max-h-20 object-contain" />
                  </div>
                )}
                <CldUploadWidget 
                  uploadPreset="ml_default"
                  onSuccess={(res: any) => setEditBrand({...editBrand, logo_url: res.info.secure_url})}
                >
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-primary hover:text-primary transition-colors">
                      <ImageIcon className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Subir / Cambiar Logo</span>
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <button disabled={loading} type="submit" className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors mt-2">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modals */}
      <ConfirmModal 
        isOpen={deleteCatId !== null}
        onClose={() => setDeleteCatId(null)}
        onConfirm={confirmDeleteCategory}
        title="Eliminar Categoría"
        message="¿Estás seguro de que deseas eliminar esta categoría? Si hay productos asociados a ella, podrían quedarse sin categoría."
      />

      <ConfirmModal 
        isOpen={deleteBrandId !== null}
        onClose={() => setDeleteBrandId(null)}
        onConfirm={confirmDeleteBrand}
        title="Eliminar Marca"
        message="¿Estás seguro de que deseas eliminar esta marca? Los productos asociados podrían quedarse sin marca."
      />
    </div>
  );
}
