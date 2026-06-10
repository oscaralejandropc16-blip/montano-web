"use server";

import { sql } from "./db";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';

// Configure cloudinary with env variables. It will automatically use CLOUDINARY_URL if it exists.
// Otherwise we try to use individual variables if the user sets them up.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const contactSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email().max(100),
  mensaje: z.string().min(5).max(2000),
  whatsapp: z.string().max(30).optional().nullable(),
});

export async function saveContactMessage(data: { nombre: string, email: string, mensaje: string, whatsapp?: string }) {
  const parsed = contactSchema.parse(data);

  await sql`
    INSERT INTO mensajes_contacto (nombre, email, mensaje, whatsapp)
    VALUES (${parsed.nombre}, ${parsed.email}, ${parsed.mensaje}, ${parsed.whatsapp || null})
  `;
}

export async function getContactMessages() {
  const rows = await sql`SELECT * FROM mensajes_contacto ORDER BY fecha DESC`;
  return rows;
}

const emailSchema = z.string().email().max(100);

export async function subscribeNewsletter(email: string) {
  try {
    const validEmail = emailSchema.parse(email);
    await sql`
      INSERT INTO montano_newsletter (email)
      VALUES (${validEmail})
      ON CONFLICT (email) DO NOTHING
    `;
    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error };
  }
}

export async function getNewsletterSubscribers() {
  const rows = await sql`SELECT * FROM montano_newsletter ORDER BY fecha DESC`;
  return rows;
}

export async function markMessageAsRead(id: number) {
  await sql`UPDATE mensajes_contacto SET leido = true WHERE id = ${id}`;
  revalidatePath('/portal/mensajes');
}

export async function deleteMessage(id: number) {
  await sql`DELETE FROM mensajes_contacto WHERE id = ${id}`;
  revalidatePath('/portal/mensajes');
}

export async function getProducts() {
  const rows = await sql`SELECT * FROM montano_products ORDER BY created_at DESC`;
  return rows;
}

export async function createProduct(data: any) {
  const { name, brand, category, tag, description, ingredients, preservation, image_url, nutrition_url } = data;
  await sql`
    INSERT INTO montano_products (name, brand, category, tag, description, ingredients, preservation, image_url, nutrition_url)
    VALUES (${name}, ${brand || 'Montano Antilia'}, ${category}, ${tag}, ${description}, ${ingredients}, ${preservation}, ${image_url}, ${nutrition_url})
  `;
  revalidatePath('/portal/productos');
  revalidatePath('/productos', 'layout');
}

export async function updateProduct(id: number, data: any) {
  const { name, brand, category, tag, description, ingredients, preservation, image_url, nutrition_url } = data;
  await sql`
    UPDATE montano_products
    SET name = ${name}, brand = ${brand || 'Montano Antilia'}, category = ${category}, tag = ${tag}, description = ${description}, 
        ingredients = ${ingredients}, preservation = ${preservation}, image_url = ${image_url}, nutrition_url = ${nutrition_url}
    WHERE id = ${id}
  `;
  revalidatePath('/portal/productos');
  revalidatePath('/productos', 'layout');
  revalidatePath(`/productos/${id}`);
}

export async function deleteProduct(id: number) {
  await sql`DELETE FROM montano_products WHERE id = ${id}`;
  revalidatePath('/portal/productos');
  revalidatePath('/productos', 'layout');
}

export async function getSettings() {
  const rows = await sql`SELECT * FROM montano_settings`;
  const settings: Record<string, string> = {};
  rows.forEach(r => settings[r.key] = r.value);
  return settings;
}

export async function saveSetting(key: string, value: string) {
  await sql`
    INSERT INTO montano_settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = ${value}
  `;
  revalidatePath('/', 'layout');
}

export async function registerVisit() {
  try {
    const date = new Date();
    const monthKey = `visits_${date.getFullYear()}_${date.getMonth() + 1}`;
    await sql`
      INSERT INTO montano_settings (key, value) 
      VALUES (${monthKey}, '1')
      ON CONFLICT (key) DO UPDATE 
      SET value = (CAST(montano_settings.value AS INTEGER) + 1)::text
    `;
  } catch (error) {
    console.error("Error registering visit:", error);
  }
}

export async function getTotalVisits() {
  try {
    const date = new Date();
    const monthKey = `visits_${date.getFullYear()}_${date.getMonth() + 1}`;
    const res = await sql`SELECT value FROM montano_settings WHERE key = ${monthKey}`;
    if (res.length > 0) return parseInt(res[0].value, 10);
    return 0;
  } catch (error) {
    return 0;
  }
}

export async function getCloudinaryMedia() {
  try {
    const [images, videos] = await Promise.all([
      cloudinary.api.resources({ type: 'upload', resource_type: 'image', max_results: 100 }),
      cloudinary.api.resources({ type: 'upload', resource_type: 'video', max_results: 50 })
    ]);
    const allResources = [...images.resources, ...videos.resources];
    allResources.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return allResources;
  } catch (error) {
    console.error("Cloudinary error:", error);
    return [];
  }
}

export async function deleteCloudinaryMedia(publicId: string, resourceType: string) {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    revalidatePath('/portal/medios');
    return { success: true };
  } catch (error) {
    console.error("Delete cloudinary error:", error);
    return { success: false };
  }
}

export async function getMedia() {
  const rows = await sql`SELECT * FROM montano_media ORDER BY created_at DESC`;
  return rows;
}

export async function createMedia(url: string) {
  await sql`INSERT INTO montano_media (url) VALUES (${url})`;
  revalidatePath('/portal/medios');
}

export async function deleteMedia(id: number) {
  try {
    // 1. Obtener la URL antes de borrar
    const mediaRows = await sql`SELECT url FROM montano_media WHERE id = ${id}`;
    if (mediaRows.length > 0 && mediaRows[0].url) {
      const url = mediaRows[0].url;
      // 2. Extraer el public_id de la URL de Cloudinary
      // Ej: https://res.cloudinary.com/.../upload/v12345/folder/image.png -> folder/image
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const withoutVersion = parts[1].replace(/^v\d+\//, '');
        const publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf('.'));
        
        // 3. Borrar de Cloudinary
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }
  } catch (error) {
    console.error("Error eliminando imagen de Cloudinary:", error);
    // Continuar para borrar de la base de datos aunque falle Cloudinary
  }

  // 4. Borrar de la base de datos local
  await sql`DELETE FROM montano_media WHERE id = ${id}`;
  revalidatePath('/portal/medios');
}

import { cookies } from 'next/headers';

export async function adminLogin(password: string) {
  if (password === 'Procarni2027.') {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', { secure: true, httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return { success: true };
  }
  return { success: false };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  revalidatePath('/portal');
}

export async function getCategories() {
  return await sql`SELECT * FROM montano_categories ORDER BY name ASC`;
}

export async function createCategory(name: string) {
  await sql`INSERT INTO montano_categories (name) VALUES (${name}) ON CONFLICT DO NOTHING`;
  revalidatePath('/portal');
}

export async function updateCategory(id: number, name: string) {
  await sql`UPDATE montano_categories SET name = ${name} WHERE id = ${id}`;
  revalidatePath('/portal');
}

export async function deleteCategory(id: number) {
  await sql`DELETE FROM montano_categories WHERE id = ${id}`;
  revalidatePath('/portal');
}

export async function getBrands() {
  return await sql`SELECT * FROM montano_brands ORDER BY name ASC`;
}

export async function createBrand(name: string, logo_url: string | null = null) {
  await sql`INSERT INTO montano_brands (name, logo_url) VALUES (${name}, ${logo_url}) ON CONFLICT DO NOTHING`;
  revalidatePath('/portal');
}

export async function updateBrand(id: number, name: string, logo_url: string | null = null) {
  await sql`UPDATE montano_brands SET name = ${name}, logo_url = ${logo_url} WHERE id = ${id}`;
  revalidatePath('/portal');
}

export async function deleteBrand(id: number) {
  await sql`DELETE FROM montano_brands WHERE id = ${id}`;
  revalidatePath('/portal');
}
