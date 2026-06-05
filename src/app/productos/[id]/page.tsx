import Link from "next/link";
import { getProducts, getBrands } from "@/lib/actions";
import ProductClient from "./ProductClient";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden relative selection:bg-primary selection:text-white">
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none hidden md:block animate-pulse"></div>

        <div className="relative z-10 text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="w-24 h-24 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="heading text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 drop-shadow-2xl">Producto Extraviado</h1>
          <p className="text-gray-400 text-lg mb-10 max-w-md font-light">Parece que el producto que estás buscando no existe o ha sido retirado de nuestro catálogo exclusivo.</p>
          
          <Link href="/productos" className="group relative overflow-hidden bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(213,43,42,0.3)]">
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Volver al Catálogo
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Obtener algunos productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = catalog.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return <ProductClient product={product} relatedProducts={relatedProducts} brandObj={brandObj} brands={brands} />;
}
