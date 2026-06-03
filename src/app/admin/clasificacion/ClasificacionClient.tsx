"use client";

import { useState } from "react";
import { Plus, Trash2, Tag, Bookmark } from "lucide-react";
import { createCategory, deleteCategory, createBrand, deleteBrand } from "@/lib/actions";

export default function ClasificacionClient({ initialCategories, initialBrands }: { initialCategories: {id: number, name: string}[], initialBrands: {id: number, name: string}[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [brands, setBrands] = useState(initialBrands);

  const [newCat, setNewCat] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleDeleteCategory = async (id: number) => {
    if(confirm("¿Eliminar categoría?")) {
      await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleDeleteBrand = async (id: number) => {
    if(confirm("¿Eliminar marca?")) {
      await deleteBrand(id);
      setBrands(brands.filter(b => b.id !== id));
    }
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
                <button onClick={() => handleDeleteCategory(c.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
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
                <span className="font-medium text-black text-sm">{b.name}</span>
                <button onClick={() => handleDeleteBrand(b.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {brands.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No hay marcas</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
