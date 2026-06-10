import { getProducts, getCategories, getBrands } from "@/lib/actions";
import ProductosClient from "./ProductosClient";

export const revalidate = 0;

export default async function ProductosPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();
  
  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-black mb-2">Gestión de Catálogo</h1>
        <p className="text-gray-500">Añade, edita o elimina productos de tu catálogo público.</p>
      </div>

      <ProductosClient initialProducts={products} dbCategories={categories} dbBrands={brands} />
    </div>
  );
}
