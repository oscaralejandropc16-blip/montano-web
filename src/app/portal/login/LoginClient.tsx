"use client";

import { useState } from "react";
import { adminLogin } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    const res = await adminLogin(password);
    
    if (res.success) {
      router.push("/portal/dashboard");
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 relative z-10 animate-fade-in-up">
        
        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 mx-auto border border-gray-100 shadow-inner">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">Acceso Restringido</h1>
          <p className="text-gray-400 text-sm">Ingresa la contraseña maestra para administrar el portal de Montano Antilia.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-300" />
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña de Administrador"
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${error ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'} rounded-xl text-black focus:outline-none focus:ring-2 focus:bg-white transition-all`}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center tracking-wide">Contraseña incorrecta. Intenta de nuevo.</p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white px-8 py-4 rounded-xl text-sm font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-primary/30 flex justify-center items-center gap-3 group"
          >
            {loading ? 'Verificando...' : 'Entrar al Panel'}
            {!loading && <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-gray-400 hover:text-black transition-colors font-medium">
            ← Volver a la página pública
          </a>
        </div>
      </div>
    </div>
  );
}
