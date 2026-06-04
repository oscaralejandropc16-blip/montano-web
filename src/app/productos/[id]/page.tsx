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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/productos" className="text-primary hover:underline">Volver al catálogo</Link>
      </div>
    );
  }

  // Obtener algunos productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = catalog.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return <ProductClient product={product} relatedProducts={relatedProducts} brandObj={brandObj} brands={brands} />;
}
