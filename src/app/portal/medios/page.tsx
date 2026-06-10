import { getCloudinaryMedia } from "@/lib/actions";
import MediosClient from "./MediosClient";

export const revalidate = 0;

export default async function MediosPage() {
  const media = await getCloudinaryMedia();

  return (
    <div className="p-10">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-black mb-2">Medios y Banners</h1>
          <p className="text-gray-500">Gestiona las imágenes de la web directamente desde Cloudinary (sincronización automática).</p>
        </div>
      </div>

      <MediosClient initialMedia={media} />
    </div>
  );
}
