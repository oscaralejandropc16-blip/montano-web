import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://montanoantilia.com'),
  title: {
    default: "Montano Antilia - Embutidos de Calidad Premium",
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
    title: "Montano Antilia - Embutidos Premium",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '10px' } }} />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
