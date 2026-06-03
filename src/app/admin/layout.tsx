"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Image as ImageIcon, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Catálogo", href: "/admin/productos", icon: Package },
    { name: "Medios y Banners", href: "/admin/medios", icon: ImageIcon },
    { name: "Ajustes", href: "/admin/ajustes", icon: Settings },
  ];

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#FAFAFA] font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col">
        <div className="mb-10 mt-4 flex justify-center">
          <img src="/logo.png" alt="Montano Antilia" className="h-10 filter invert" />
        </div>
        
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 ml-4">Panel de Control</p>
        
        <nav className="space-y-2 flex-1">
          {nav.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="mt-auto flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" /> Salir al Sitio Web
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#FAFAFA]">
        {children}
      </main>
    </div>
  );
}
