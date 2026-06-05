import { getProducts, getContactMessages, getTotalVisits } from "@/lib/actions";
import { Package, MessageCircle, Star, Eye, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = await getProducts();
  const messages = await getContactMessages();
  const visits = await getTotalVisits();

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-black rounded-3xl p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/30 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Bienvenido de nuevo, Administrador</h1>
            <p className="text-gray-400 font-medium text-sm md:text-base max-w-xl">Aquí tienes un resumen del rendimiento de Montano Antilia. Todo está funcionando a la perfección hoy.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" target="_blank" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2">
              Ver Sitio Web <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Productos</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{products.length}</p>
                <div className="flex items-center text-emerald-500 text-xs font-bold mb-1.5"><TrendingUp className="w-3 h-3 mr-1"/> Activos</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner border border-blue-500/10">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mensajes</p>
              <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{messages.length}</p>
            </div>
          </div>
        </div>

        <div className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner border border-purple-500/10">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Visitas Mes</p>
              <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{visits}</p>
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-slate-900 to-black p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-slate-800 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 shadow-inner border border-amber-500/20 backdrop-blur-sm">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado del Sistema</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <p className="text-2xl font-extrabold text-white tracking-tight">Activa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-gray-50 rounded-tl-full -mb-20 -mr-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Acciones Rápidas</h2>
          <p className="text-sm text-gray-500 mb-8">Accesos directos a las funciones más utilizadas del sistema.</p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/productos" className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-primary transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
              <Package className="w-4 h-4 transition-transform group-hover:scale-110" /> Gestionar Catálogo
            </Link>
            <Link href="/admin/ajustes" className="group flex items-center gap-2 bg-gray-50 text-slate-700 px-6 py-4 rounded-2xl font-bold text-sm hover:bg-gray-100 hover:text-slate-900 transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5">
              Cambiar Video de Portada
            </Link>
            <Link href="/admin/ajustes" className="group flex items-center gap-2 bg-white text-slate-700 px-6 py-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5">
              Cambiar Logo de la Web
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
