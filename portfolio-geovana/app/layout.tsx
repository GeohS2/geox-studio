import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Configurando as fontes
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GEOX | Design UX",
  description: "Portfolio profissional de Design Gráfico e Landing Pages de alta conversão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}