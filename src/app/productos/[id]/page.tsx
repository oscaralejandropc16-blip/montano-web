import Link from "next/link";
import { ArrowLeft, Info, MessageCircle, ChevronRight, Check } from "lucide-react";
import { getProducts, getBrands } from "@/lib/actions";
import ZoomableImage from "./ZoomableImage";
import Footer from "@/components/Footer";

export const revalidate = 300;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const catalog = await getProducts();
  const brands = await getBrands();
  const product = catalog.find(p => Number(p.id) === id);
  const brandObj = product ? brands.find(b => b.name === product.brand) : null;

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl py-3 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/productos" className="flex items-center gap-2 transition-colors group text-gray-500 hover:text-primary">
              <div className="p-2 rounded-full group-hover:-translate-x-1 transition-transform border bg-gray-50 border-gray-200">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-[0.2em] text-[10px] uppercase hidden sm:block">Volver</span>
            </Link>
            <div className="h-8 md:h-10 w-[1px] bg-gray-200 hidden sm:block"></div>
            <Link href="/" className="flex items-center">
              <div className="h-12 md:h-14 relative">
                <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-sm" />
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">Inicio</Link>
            <Link href="/productos" className="text-primary font-bold transition-colors tracking-widest text-xs uppercase border-b-2 border-primary pb-1">Catálogo</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">Nosotros</Link>
            <a href="/#contacto" className="text-gray-600 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">Contacto</a>
          </div>

          <Link href="/productos" className="lg:hidden flex items-center gap-2 text-gray-500 hover:text-primary transition-colors group">
            <div className="bg-gray-100 p-2 rounded-full border border-gray-200">
              <ArrowLeft className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">Catálogo</span>
          </Link>
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

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Columna Izquierda: Imagen Principal con Zoom */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] transform -rotate-1 group-hover:rotate-0 transition-transform duration-700 z-0"></div>
                <div className="relative z-10 bg-white rounded-[2rem] p-4 shadow-2xl border border-gray-100">
                  {product.image_url ? (
                    <ZoomableImage src={product.image_url} alt={product.name} />
                  ) : (
                    <div className="w-full aspect-square bg-[#F8F8F8] rounded-2xl flex items-center justify-center">
                      <span className="text-gray-300 font-extrabold text-2xl tracking-widest">[FOTO PENDIENTE]</span>
                    </div>
                  )}
                  {/* Etiqueta Calidad */}
                  <div className="absolute top-8 left-8 z-20 pointer-events-none">
                    <span className="bg-black/90 backdrop-blur text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg text-white">
                      Calidad Premium
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información y Compra */}
            <div className="w-full lg:w-1/2 pt-4">
              
              <div className="mb-8">
                <div className="flex items-center gap-6 mb-4">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-extrabold tracking-[0.2em] uppercase text-[10px]">{product.category}</span>
                  {brandObj && brandObj.logo_url && (
                    <div className="h-16 w-32 flex items-center justify-start">
                      <img src={brandObj.logo_url} alt={brandObj.name} className="h-full w-full object-contain object-left drop-shadow-md" />
                    </div>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-black mb-4 leading-[1.1] tracking-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mt-6">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-primary font-bold italic font-serif">kg</div>
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Presentación</p>
                      <p className="text-sm font-extrabold text-black">{product.tag}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <h3 className="text-xl font-extrabold text-black mb-2">¿Interesado en este producto?</h3>
                <p className="text-sm text-gray-500 mb-6">Contáctanos vía WhatsApp para confirmar disponibilidad y precios actualizados.</p>
                
                <a 
                  href={`https://wa.me/584243699740?text=${encodeURIComponent(`Hola Montano Antilia, estoy interesado en conocer precios y disponibilidad de: ${product.name} (${product.tag})`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#1DA851] transition-all shadow-lg shadow-[#25D366]/30 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" /> Consultar Precios
                </a>
                
                <div className="mt-5 space-y-2">
                  <p className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Check className="w-3.5 h-3.5 text-primary" /> Ventas al mayor y gran mayor disponibles.
                  </p>
                  <p className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Check className="w-3.5 h-3.5 text-primary" /> Ventas al detal en nuestra distribuidora.
                  </p>
                </div>
              </div>

              {/* Detalles (Tarjetas Minimalistas) */}
              <div className="space-y-6">
                
                {product.description && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                    <h4 className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
                      <Info className="w-3.5 h-3.5 text-primary" /> Descripción General
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.ingredients && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
                        Ingredientes
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>
                  )}

                  {product.preservation && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
                        Conservación
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.preservation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Información Nutricional */}
                {product.nutrition_url && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">
                      Información Nutricional
                    </h4>
                    <div className="max-w-xs mx-auto">
                      <ZoomableImage src={product.nutrition_url} alt="Información Nutricional" />
                    </div>
                  </div>
                )}

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
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 h-full flex flex-col relative">
                      <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-xl overflow-hidden relative mb-4 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        {rel.image_url ? (
                          <img src={rel.image_url} alt={rel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <span className="text-gray-300 font-bold text-sm">[FOTO {rel.id}]</span>
                        )}
                      </div>
                      <div className="px-2 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-primary text-[9px] font-extrabold tracking-widest uppercase">{rel.tag}</p>
                          {(() => {
                            const b = brands.find(b => b.name === rel.brand);
                            if (b && b.logo_url) {
                              return (
                                <div className="h-6 w-16 flex items-center justify-end">
                                  <img src={b.logo_url} alt={b.name} className="h-full w-full object-contain object-right transition-transform group-hover:scale-105" />
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
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

      {/* FOOTER PREMIUM REUSABLE */}
      <Footer />
    </div>
  );
}
