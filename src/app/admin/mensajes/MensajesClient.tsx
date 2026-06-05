"use client";

import { useState } from "react";
import { markMessageAsRead, deleteMessage } from "@/lib/actions";
import { Mail, CheckCircle2, Trash2, Calendar, User, Search, Loader2, Send, ChevronLeft, ChevronRight, MessageCircle, AlertCircle } from "lucide-react";

export default function MensajesClient({ initialMensajes }: { initialMensajes: any[] }) {
  const [mensajes, setMensajes] = useState(initialMensajes);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAction, setLoadingAction] = useState<number | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = mensajes.filter(m => 
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRead = async (id: number) => {
    setLoadingAction(id);
    await markMessageAsRead(id);
    setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: true } : m));
    setLoadingAction(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este mensaje?")) return;
    setLoadingAction(id);
    await deleteMessage(id);
    setMensajes(mensajes.filter(m => m.id !== id));
    // Check if we need to go back a page
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
    setLoadingAction(null);
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Bandeja de Entrada</h1>
              <p className="text-sm text-blue-200/70 font-medium mt-1">
                Tienes <strong className="text-white">{mensajes.filter(m => !m.leido).length} mensajes nuevos</strong> por leer
              </p>
            </div>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o contenido..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden flex flex-col min-h-[500px] relative">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center justify-center h-full gap-6 flex-1">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <AlertCircle className="w-10 h-10 text-gray-300" />
            </div>
            <div>
              <p className="font-bold text-xl text-slate-700">Bandeja Vacía</p>
              <p className="text-sm text-gray-500 mt-1">No se encontraron mensajes con esos términos.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-gray-100/80 bg-gray-50/30">
              {currentItems.map(m => (
                <div 
                  key={m.id} 
                  className={`p-6 md:p-8 transition-all duration-300 hover:bg-white flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center relative group ${
                    m.leido ? 'opacity-80 bg-transparent' : 'bg-blue-50/30 hover:bg-blue-50/50'
                  }`}
                >
                  {!m.leido && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  )}
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-base font-bold text-slate-900">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${m.leido ? 'bg-gray-100 text-gray-500' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md'}`}>
                          {m.nombre.charAt(0).toUpperCase()}
                        </div>
                        {m.nombre}
                      </div>
                      {!m.leido && (
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
                          Nuevo
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-slate-700 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm leading-relaxed relative">
                      <div className="absolute top-0 left-6 -mt-1.5 w-3 h-3 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                      "{m.mensaje}"
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-[13px] text-gray-500 font-medium pt-1">
                      <span className="flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Mail className="w-4 h-4 text-slate-400" /> 
                        {m.email}
                      </span>
                      {m.whatsapp && (
                        <a href={`https://wa.me/${m.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors px-3 py-1.5 rounded-lg cursor-pointer">
                          <MessageCircle className="w-4 h-4 text-emerald-500" /> 
                          {m.whatsapp}
                        </a>
                      )}
                      <span className="flex items-center gap-2 text-gray-400 ml-auto">
                        <Calendar className="w-4 h-4" /> 
                        {new Date(m.fecha).toLocaleString('es-VE', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-100/50 justify-end">
                    <a 
                      href={`mailto:${m.email}?subject=Respuesta de Montano Antilia`}
                      className="flex justify-center items-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-xl"
                    >
                      <Send className="w-4 h-4" />
                      Responder
                    </a>
                    
                    {m.whatsapp && (
                      <a 
                        href={`https://wa.me/${m.whatsapp.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(m.nombre)},%20te%20contactamos%20de%20Montano%20Antilia...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 hover:-translate-y-0.5 font-bold text-xs rounded-xl transition-all border border-[#25D366]/30 hover:shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    )}
                    
                    {!m.leido && (
                      <button 
                        onClick={() => handleRead(m.id)}
                        disabled={loadingAction === m.id}
                        className="flex justify-center items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:-translate-y-0.5 font-bold text-xs rounded-xl transition-all border border-blue-100 hover:border-blue-200 hover:shadow-md disabled:opacity-50"
                      >
                        {loadingAction === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        Marcar Leído
                      </button>
                    )}
                    
                    <button 
                      onClick={() => handleDelete(m.id)}
                      disabled={loadingAction === m.id}
                      className="flex justify-center items-center w-10 h-10 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 font-bold text-xs rounded-xl transition-all border border-gray-200 hover:border-red-100 hover:shadow-md disabled:opacity-50 group/btn"
                      title="Eliminar mensaje"
                    >
                      {loadingAction === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                <p className="text-sm text-gray-500 font-medium">
                  Mostrando <strong className="text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</strong> a <strong className="text-slate-900">{Math.min(currentPage * itemsPerPage, filtered.length)}</strong> de <strong className="text-slate-900">{filtered.length}</strong> mensajes
                </p>
                <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
