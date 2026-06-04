"use client";

import { useState } from "react";
import { markMessageAsRead, deleteMessage } from "@/lib/actions";
import { Mail, CheckCircle2, Trash2, Calendar, User, Search, Loader2, Send, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Bandeja de Mensajes</h1>
            <p className="text-sm text-gray-500 font-medium">Gestiona y responde las consultas de tus clientes</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar mensaje..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-72 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center justify-center h-full gap-4 flex-1">
            <Mail className="w-16 h-16 opacity-20" />
            <p className="font-medium text-lg text-gray-500">No se encontraron mensajes</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100 flex-1">
              {currentItems.map(m => (
                <div key={m.id} className={`p-6 transition-all duration-300 hover:bg-gray-50 flex flex-col lg:flex-row gap-6 items-start lg:items-center ${m.leido ? 'opacity-70 bg-white' : 'bg-blue-50/20 border-l-4 border-l-blue-500 shadow-sm'}`}>
                  
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex items-center justify-between lg:justify-start gap-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <User className="w-4 h-4 text-gray-400" />
                        {m.nombre}
                      </div>
                      {!m.leido && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50/80 p-4 rounded-xl border border-gray-100/50 italic leading-relaxed">
                      "{m.mensaje}"
                    </div>
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs text-gray-500 font-medium pt-1">
                      <span className="flex items-center gap-1.5 break-all text-gray-600">
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" /> 
                        {m.email}
                      </span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap text-gray-400">
                        <Calendar className="w-3.5 h-3.5" /> 
                        {new Date(m.fecha).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 mt-2 lg:mt-0 justify-end">
                    <a 
                      href={`mailto:${m.email}?subject=Respuesta de Montano Antilia`}
                      className="flex flex-1 lg:flex-none justify-center items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 font-bold text-xs rounded-lg transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      Responder
                    </a>
                    
                    {!m.leido && (
                      <button 
                        onClick={() => handleRead(m.id)}
                        disabled={loadingAction === m.id}
                        className="flex flex-1 lg:flex-none justify-center items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs rounded-lg transition-colors border border-blue-200 disabled:opacity-50"
                      >
                        {loadingAction === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        Leído
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(m.id)}
                      disabled={loadingAction === m.id}
                      className="flex flex-1 lg:flex-none justify-center items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs rounded-lg transition-colors border border-red-200 disabled:opacity-50"
                    >
                      {loadingAction === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      Eliminar
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                <p className="text-xs text-gray-500 font-medium">
                  Mostrando <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> de <span className="font-bold text-gray-900">{filtered.length}</span> mensajes
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
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
