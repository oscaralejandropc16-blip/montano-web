import { getSettings, getProducts } from "@/lib/actions";
import AjustesClient from "./AjustesClient";

export const revalidate = 0;

export default async function AjustesPage() {
  const settings = await getSettings();
  const allProducts = await getProducts();
  
  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-black mb-2">Ajustes Generales</h1>
        <p className="text-gray-500">Configura variables globales de la página como videos o textos institucionales.</p>
      </div>

      <AjustesClient settings={settings} products={allProducts} />
    </div>
  );
}
