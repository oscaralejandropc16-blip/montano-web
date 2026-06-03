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
  title: "Montano Antilia - El sabor que conquista",
  description: "Montano Antilia elabora embutidos de calidad superior, fusionando tradición e innovación para ofrecer productos frescos y con sabor auténtico.",
};

import { Toaster } from 'react-hot-toast';

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
      </body>
    </html>
  );
}
