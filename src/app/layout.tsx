import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { config } from "@/data/config";
import Providers from "@/components/theme-provider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Particles from "@/components/Particles";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Preloader from "@/components/preloader";
import ElasticCursor from "@/components/ui/ElasticCursor";
import EasterEggs from "@/components/easter-eggs";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.UMAMI_DOMAIN && process.env.UMAMI_SITE_ID && (
          <Script
            defer
            src={process.env.UMAMI_DOMAIN}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        )}
      </head>
      <body className={archivoBlack.className}>
        <Providers attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Particles className="fixed inset-0 -z-10 animate-fade-in" quantity={100} />
          <Preloader>
            <TooltipProvider>
              <Header />
              {children}
              <Footer />
            </TooltipProvider>
            <Toaster />
            <EasterEggs />
            <ElasticCursor />
          </Preloader>
        </Providers>
      </body>
    </html>
  );
}
