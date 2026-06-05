import { getProducts } from "@/lib/actions";
import { Package, Eye, Star } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-extrabold text-black mb-2">Bienvenido, Administrador</h1>
      <p className="text-gray-500 mb-10">Panel de control de Montano Antilia.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Productos</p>
            <p className="text-3xl font-extrabold text-black">{products.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visitas Mes</p>
            <p className="text-3xl font-extrabold text-black">--</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estado Web</p>
            <p className="text-xl font-extrabold text-black">Activa</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-black mb-6">Acciones Rápidas</h2>
        <div className="flex gap-4">
          <Link href="/admin/productos" className="bg-black text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-primary transition-colors">
            Gestionar Catálogo
          </Link>
          <Link href="/admin/ajustes" className="bg-gray-100 text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors">
            Cambiar Video de Portada
          </Link>
          <Link href="/admin/ajustes" className="bg-gray-100 text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors border border-gray-200">
            Cambiar Logo de la Web
          </Link>
        </div>
      </div>
    </div>
  );
}
