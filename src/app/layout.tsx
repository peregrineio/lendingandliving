import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Analytics } from "@/components/shared/Analytics";
import { PersonSchema, LocalBusinessSchema } from "@/components/seo";
import "./globals.css";

// Primary heading font - Elegant serif
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Body text font - Clean sans-serif
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display font - Elegant alternative for accents
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Monospace font for code
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lendingandliving.com'),
  title: {
    default: "Lending & Living | Bilingual Mortgage Loan Officer Houston TX",
    template: "%s | Lending & Living",
  },
  description: "Houston's bilingual mortgage loan officer. FHA, ITIN, down payment assistance, VA, USDA, and refinance loans. Serving first-time buyers in English & Spanish.",
  keywords: [
    "mortgage loan officer Houston",
    "Houston mortgage",
    "ITIN loans Houston",
    "FHA loans Houston",
    "VA loans Houston",
    "first-time home buyer Houston",
    "down payment assistance Houston",
    "bilingual mortgage Houston",
    "Spanish mortgage services",
    "Texas mortgage",
    "Daisy Castro",
    "Lending & Living",
  ],
  authors: [{ name: "Daisy Castro" }],
  creator: "Peregrine IO",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    siteName: "Lending & Living",
    url: 'https://lendingandliving.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://lendingandliving.com',
    languages: {
      'en-US': 'https://lendingandliving.com',
      'es-US': 'https://lendingandliving.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <PersonSchema />
        <LocalBusinessSchema />
        <Analytics />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
