"use server";

import { sql } from "./db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const rows = await sql`SELECT * FROM montano_products ORDER BY created_at DESC`;
  return rows;
}

export async function createProduct(data: any) {
  const { name, brand, category, tag, description, ingredients, preservation, image_url } = data;
  await sql`
    INSERT INTO montano_products (name, brand, category, tag, description, ingredients, preservation, image_url)
    VALUES (${name}, ${brand || 'Montano Antilia'}, ${category}, ${tag}, ${description}, ${ingredients}, ${preservation}, ${image_url})
  `;
  revalidatePath('/admin/productos');
  revalidatePath('/productos');
}

export async function updateProduct(id: number, data: any) {
  const { name, brand, category, tag, description, ingredients, preservation, image_url } = data;
  await sql`
    UPDATE montano_products
    SET name = ${name}, brand = ${brand || 'Montano Antilia'}, category = ${category}, tag = ${tag}, description = ${description}, 
        ingredients = ${ingredients}, preservation = ${preservation}, image_url = ${image_url}
    WHERE id = ${id}
  `;
  revalidatePath('/admin/productos');
  revalidatePath('/productos');
  revalidatePath(`/productos/${id}`);
}

export async function deleteProduct(id: number) {
  await sql`DELETE FROM montano_products WHERE id = ${id}`;
  revalidatePath('/admin/productos');
  revalidatePath('/productos');
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

export async function deleteCategory(id: number) {
  await sql`DELETE FROM montano_categories WHERE id = ${id}`;
  revalidatePath('/admin');
}

export async function getBrands() {
  return await sql`SELECT * FROM montano_brands ORDER BY name ASC`;
}

export async function createBrand(name: string) {
  await sql`INSERT INTO montano_brands (name) VALUES (${name}) ON CONFLICT DO NOTHING`;
  revalidatePath('/admin');
}

export async function deleteBrand(id: number) {
  await sql`DELETE FROM montano_brands WHERE id = ${id}`;
  revalidatePath('/admin');
}
