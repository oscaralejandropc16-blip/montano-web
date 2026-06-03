import { getCategories, getBrands } from "@/lib/actions";
import ClasificacionClient from "./ClasificacionClient";

export const revalidate = 0;

export default async function ClasificacionPage() {
  const categories = await getCategories();
  const brands = await getBrands();
  
  return <ClasificacionClient initialCategories={categories} initialBrands={brands} />;
}
