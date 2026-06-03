import Link from "next/link";
import { ArrowLeft, Info, MessageCircle, ChevronRight, Check } from "lucide-react";
import { getProducts } from "@/lib/actions";

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const catalog = await getProducts();
  const product = catalog.find(p => Number(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/productos" className="text-primary hover:underline">Volver al catálogo</Link>
      </div>
    );
  }

  // Obtener algunos productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = catalog.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-foreground font-sans">
      
      {/* NAVEGACIÓN */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl py-3 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/productos" className="flex items-center gap-4 transition-colors group text-black hover:text-primary">
            <div className="p-2.5 rounded-full group-hover:-translate-x-1 transition-transform border bg-black/5 border-black/10">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-[0.2em] text-xs uppercase hidden sm:block">Volver al Catálogo</span>
          </Link>
          <div className="h-10 relative">
            <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain filter invert drop-shadow-none" />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 mb-10">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/productos" className="hover:text-primary transition-colors">Catálogo</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">{product.category}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Columna Izquierda: Imagen */}
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700 z-0"></div>
                <div className="w-full aspect-square bg-[#F0F0F0] rounded-2xl overflow-hidden shadow-2xl relative z-10 flex items-center justify-center">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-300 font-extrabold text-3xl tracking-widest">[FOTO ALTA CALIDAD]</span>
                  )}
                  
                  {/* Etiqueta Calidad */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-black/90 backdrop-blur text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg text-white">
                      Calidad Premium
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información del Producto */}
            <div className="w-full lg:w-1/2 py-4">
              
              <span className="text-primary font-extrabold tracking-[0.3em] uppercase text-xs mb-3 block">{product.category}</span>
              <h1 className="heading text-4xl lg:text-6xl font-extrabold text-black mb-8 leading-tight">
                {product.name}
              </h1>

              {/* Tag Formato */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 mb-10 inline-flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-serif italic text-xl text-primary font-bold">kg</span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">Formato / Presentación</p>
                  <p className="text-base font-extrabold text-black">{product.tag}</p>
                </div>
              </div>

              {/* Descripciones */}
              <div className="space-y-8">
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-black mb-4 border-b border-gray-100 pb-3">
                    <Info className="w-4 h-4 text-primary" /> Detalles del Producto
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-lg">
                    {product.desc}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-black mb-3">
                      Ingredientes Clave
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed text-sm">
                      {product.ingredients}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-black mb-3">
                      Modo de Conservación
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed text-sm">
                      {product.preservation}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-14 pt-10 border-t border-gray-100">
                <a 
                  href={`https://wa.me/584243699740?text=${encodeURIComponent(`Hola Montano Antilia, estoy interesado en conocer la disponibilidad del producto: ${product.name} (${product.tag})`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-xl text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#1DA851] hover:-translate-y-1 transition-all shadow-xl shadow-[#25D366]/30"
                >
                  <MessageCircle className="w-5 h-5" /> Consultar al Mayor
                </a>
                <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
                  <Check className="w-3 h-3 text-primary" /> Venta exclusiva al mayor y gran mayor.
                </p>
              </div>

            </div>
          </div>

          {/* PRODUCTOS RELACIONADOS */}
          {relatedProducts.length > 0 && (
            <div className="mt-32 pt-20 border-t border-gray-100">
              <h2 className="heading text-3xl font-extrabold text-black mb-10 text-center">También te podría interesar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {relatedProducts.map(rel => (
                  <Link href={`/productos/${rel.id}`} key={rel.id} className="group cursor-pointer">
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 h-full flex flex-col">
                      <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-xl overflow-hidden relative mb-4 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        <span className="text-gray-300 font-bold text-sm">[FOTO {rel.id}]</span>
                      </div>
                      <div className="px-2 pb-2">
                        <p className="text-primary text-[9px] font-extrabold tracking-widest uppercase mb-1">{rel.tag}</p>
                        <h4 className="font-bold text-black group-hover:text-primary transition-colors">{rel.name}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white/50 py-10 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wider uppercase">Copyright © 2026 Montano Antilia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
