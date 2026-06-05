import { getSettings } from "@/lib/actions";
import { NextResponse } from "next/server";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const settings = await getSettings();
  // We use the absolute URL for the default fallback to avoid relative redirect loops if hosted on vercel
  const defaultLogo = "https://montanoantilia.com/logo.png";
  const logoUrl = settings.site_logo || defaultLogo;
  
  return NextResponse.redirect(logoUrl);
}
