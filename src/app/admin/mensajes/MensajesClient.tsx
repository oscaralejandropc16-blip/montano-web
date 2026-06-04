"use client";

import { useState } from "react";
import { markMessageAsRead, deleteMessage } from "@/lib/actions";
import { Mail, CheckCircle2, Trash2, Calendar, User, Search, Loader2 } from "lucide-react";

export default function MensajesClient({ initialMensajes }: { initialMensajes: any[] }) {
  const [mensajes, setMensajes] = useState(initialMensajes);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAction, setLoadingAction] = useState<number | null>(null);

  const filtered = mensajes.filter(m => 
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <p className="text-sm text-gray-500 font-medium">Gestiona las consultas de tus clientes</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar mensaje..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center gap-4">
            <Mail className="w-12 h-12 opacity-20" />
            <p className="font-medium text-lg text-gray-500">No hay mensajes</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(m => (
              <div key={m.id} className={`p-6 transition-colors hover:bg-gray-50 flex flex-col lg:flex-row gap-6 items-start lg:items-center ${m.leido ? 'opacity-70' : 'bg-blue-50/30'}`}>
                
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center justify-between lg:justify-start gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <User className="w-4 h-4 text-gray-400" />
                      {m.nombre}
                    </div>
                    {!m.leido && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                    "{m.mensaje}"
                  </div>
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5 break-all">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" /> 
                      <a href={`mailto:${m.email}`} className="hover:text-primary hover:underline">{m.email}</a>
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5" /> 
                      {new Date(m.fecha).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 mt-2 lg:mt-0 justify-end">
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
        )}
      </div>
    </div>
  );
}
