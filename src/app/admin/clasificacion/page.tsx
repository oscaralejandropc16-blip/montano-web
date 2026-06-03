import { getCategories, getBrands } from "@/lib/actions";
import ClasificacionClient from "./ClasificacionClient";

export const revalidate = 0;

export default async function ClasificacionPage() {
  const categories = (await getCategories()) as { id: number; name: string }[];
  const brands = (await getBrands()) as { id: number; name: string }[];
  
  return <ClasificacionClient initialCategories={categories} initialBrands={brands} />;
}
