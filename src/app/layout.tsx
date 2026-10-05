import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://montanoantilia.com'),
  title: {
    default: "Montano Antilia - El Sabor que Conquista",
    template: "%s | Montano Antilia"
  },
  description: "Montano Antilia elabora embutidos de calidad superior en Venezuela. Fusionamos tradición e innovación para ofrecerte salchichas, chorizos y más productos frescos con sabor auténtico.",
  keywords: ["embutidos", "carnicería", "salchichas", "chorizos", "Montano Antilia", "charcutería", "Venezuela", "calidad premium", "alimentos"],
  authors: [{ name: "Montano Antilia" }],
  creator: "Montano Antilia",
  publisher: "Montano Antilia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "PQzydy0uEbbwbkCCqPXGoAv7uBXhdfwbJRz7aTzCTiA",
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "https://montanoantilia.com",
    title: "Montano Antilia - El Sabor que Conquista",
    description: "Embutidos de calidad superior. Tradición e innovación en cada bocado.",
    siteName: "Montano Antilia",
    images: [
      {
        url: "/api/logo",
        width: 800,
        height: 600,
        alt: "Montano Antilia Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montano Antilia - El Sabor que Conquista",
    description: "Embutidos de calidad superior. Tradición e innovación en cada bocado.",
    images: ["/api/logo"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/api/logo",
    shortcut: "/api/logo",
    apple: "/api/logo",
  },
};

import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ScrollToTop';
import HalloweenAtmosphere from '@/components/HalloweenAtmosphere';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth dark">
      <body
        className="antialiased bg-[#090511] text-[#F8FAFC]"
      >
        <HalloweenAtmosphere />
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#1c0f2b', color: '#ff8c00', border: '1px solid rgba(255,106,0,0.3)', borderRadius: '14px' } }} />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
