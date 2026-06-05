import { getSettings } from "@/lib/actions";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: NextRequest) {
  const settings = await getSettings();
  const logoUrl = settings.site_logo || "/logo.png";
  
  if (logoUrl.startsWith('/')) {
    return NextResponse.redirect(new URL(logoUrl, request.url));
  }
  
  return NextResponse.redirect(logoUrl);
}
