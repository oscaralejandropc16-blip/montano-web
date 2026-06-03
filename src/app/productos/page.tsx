import { getProducts } from "@/lib/actions";
import CatalogClient from "./CatalogClient";

export const revalidate = 0; // Para que el catálogo esté siempre fresco al refrescar

export default async function ProductosPage() {
  const products = await getProducts();
  return <CatalogClient catalog={products} />;
}
