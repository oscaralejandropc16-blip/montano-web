"use server";

import { sql } from "./db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const rows = await sql`SELECT * FROM montano_products ORDER BY created_at DESC`;
  return rows;
}

export async function createProduct(data: any) {
  await sql`
    INSERT INTO montano_products (name, category, tag, description, ingredients, preservation, image_url)
    VALUES (${data.name}, ${data.category}, ${data.tag}, ${data.description}, ${data.ingredients}, ${data.preservation}, ${data.image_url})
  `;
  revalidatePath('/admin/productos');
  revalidatePath('/productos');
}

export async function updateProduct(id: number, data: any) {
  await sql`
    UPDATE montano_products SET
      name = ${data.name},
      category = ${data.category},
      tag = ${data.tag},
      description = ${data.description},
      ingredients = ${data.ingredients},
      preservation = ${data.preservation},
      image_url = ${data.image_url}
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
