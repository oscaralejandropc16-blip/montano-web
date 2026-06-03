import { getProducts, getCategories } from "@/lib/actions";
import CatalogClient from "./CatalogClient";

export const revalidate = 0; // Para que el catálogo esté siempre fresco al refrescar

export default async function ProductosPage() {
  const catalog = await getProducts();
  const categories = await getCategories();
  return <CatalogClient catalog={catalog} dbCategories={categories} />;
}
