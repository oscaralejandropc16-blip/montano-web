import { getNewsletterSubscribers } from "@/lib/actions";
import { Mail, Calendar, Users, Download } from "lucide-react";

export const revalidate = 0;

export default async function NewsletterAdminPage() {
  const subscribers = await getNewsletterSubscribers();

  return (
    <div className="p-8 max-w-6xl mx-auto w-full animate-fade-in-up">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-black flex items-center gap-3">
            <Mail className="w-8 h-8 text-primary" /> Suscriptores al Newsletter
          </h1>
          <p className="text-gray-500 mt-2">Gestiona los correos electrónicos de los clientes suscritos a tus promociones.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Suscritos</p>
              <p className="text-2xl font-extrabold text-black">{subscribers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-black text-lg">Lista de Correos</h2>
        </div>
        
        {subscribers.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No hay suscriptores aún</h3>
            <p className="text-gray-500 max-w-sm">Cuando los usuarios dejen su correo en el pie de página, aparecerán listados aquí.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="py-4 px-6 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Correo Electrónico</th>
                  <th className="py-4 px-6 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Fecha de Suscripción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscribers.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                          {sub.email.charAt(0)}
                        </div>
                        <span className="font-medium text-black">{sub.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(sub.fecha).toLocaleDateString("es-VE", {
                          year: 'numeric', month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
