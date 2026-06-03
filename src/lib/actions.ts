"use server";

import { sql } from "./db";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary with env variables. It will automatically use CLOUDINARY_URL if it exists.
// Otherwise we try to use individual variables if the user sets them up.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
  revalidatePath('/admin/productos');
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
  revalidatePath('/admin/productos');
  revalidatePath('/productos', 'layout');
  revalidatePath(`/productos/${id}`);
}

export async function deleteProduct(id: number) {
  await sql`DELETE FROM montano_products WHERE id = ${id}`;
  revalidatePath('/admin/productos');
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
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function getMedia() {
  const rows = await sql`SELECT * FROM montano_media ORDER BY created_at DESC`;
  return rows;
}

export async function createMedia(url: string) {
  await sql`INSERT INTO montano_media (url) VALUES (${url})`;
  revalidatePath('/admin/medios');
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
  revalidatePath('/admin/medios');
}

import { cookies } from 'next/headers';

export async function adminLogin(password: string) {
  if (password === 'montano2026') {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', { secure: true, httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return { success: true };
  }
  return { success: false };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  revalidatePath('/admin');
}

export async function getCategories() {
  return await sql`SELECT * FROM montano_categories ORDER BY name ASC`;
}

export async function createCategory(name: string) {
  await sql`INSERT INTO montano_categories (name) VALUES (${name}) ON CONFLICT DO NOTHING`;
  revalidatePath('/admin');
}

export async function updateCategory(id: number, name: string) {
  await sql`UPDATE montano_categories SET name = ${name} WHERE id = ${id}`;
  revalidatePath('/admin');
}

export async function deleteCategory(id: number) {
  await sql`DELETE FROM montano_categories WHERE id = ${id}`;
  revalidatePath('/admin');
}

export async function getBrands() {
  return await sql`SELECT * FROM montano_brands ORDER BY name ASC`;
}

export async function createBrand(name: string, logo_url: string | null = null) {
  await sql`INSERT INTO montano_brands (name, logo_url) VALUES (${name}, ${logo_url}) ON CONFLICT DO NOTHING`;
  revalidatePath('/admin');
}

export async function updateBrand(id: number, name: string, logo_url: string | null = null) {
  await sql`UPDATE montano_brands SET name = ${name}, logo_url = ${logo_url} WHERE id = ${id}`;
  revalidatePath('/admin');
}

export async function deleteBrand(id: number) {
  await sql`DELETE FROM montano_brands WHERE id = ${id}`;
  revalidatePath('/admin');
}
