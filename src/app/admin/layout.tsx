"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Image as ImageIcon, Settings, LogOut, Tag, Mail } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Mensajes", href: "/admin/mensajes", icon: Mail },
    { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { name: "Catálogo", href: "/admin/productos", icon: Package },
    { name: "Medios y Banners", href: "/admin/medios", icon: ImageIcon },
    { name: "Clasificación", href: "/admin/clasificacion", icon: Tag },
    { name: "Ajustes", href: "/admin/ajustes", icon: Settings },
  ];

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#FAFAFA] font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-primary/20 selection:text-primary">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col border-r border-slate-900 relative overflow-hidden shadow-2xl z-50">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>

        <div className="mb-10 mt-8 flex justify-center relative z-10 px-6">
          <img src="/api/logo" alt="Montano Antilia" className="h-10 drop-shadow-lg" />
        </div>
        
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 ml-8 relative z-10">Panel de Control</p>
        
        <nav className="space-y-1 flex-1 px-4 relative z-10 overflow-y-auto custom-scrollbar">
          {nav.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium text-sm group relative ${
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.5)]"></div>
                )}
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 relative z-10 mt-auto border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300 group">
            <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" /> Salir al Sitio Web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}
