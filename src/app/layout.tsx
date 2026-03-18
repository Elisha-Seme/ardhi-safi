import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";
import Script from "next/script";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ardhisafi.co.ke"),
  title: {
    default: "Ardhi Safi | Clean Land, Clear Titles — Kenya Real Estate",
    template: "%s | Ardhi Safi"
  },
  icons: {
    icon: "/images/brand/icon-light.jpeg",
    apple: "/images/brand/icon-light.jpeg",
  },
  description:
    "Ardhi Safi Limited is a licensed Kenyan real estate firm providing property sales, letting, management, and investment advisory services. Registered by EARB (Estate Agents Registration Board).",
  keywords: [
    "Kenya real estate",
    "property for sale Kenya",
    "property management Nairobi",
    "Ardhi Safi",
    "EARB registered",
    "real estate Kenya",
    "buy land in Kenya",
  ],
  authors: [{ name: "Ardhi Safi Limited" }],
  creator: "Ardhi Safi Limited",
  publisher: "Ardhi Safi Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ardhi Safi | Clean Land, Clear Titles",
    description: "Professional real estate services across Kenya — sales, letting, management, and investment. Licensed by EARB.",
    url: "https://ardhisafi.co.ke",
    siteName: "Ardhi Safi",
    images: [
      {
        url: "/images/brand/logo-dark.jpeg",
        width: 1200,
        height: 630,
        alt: "Ardhi Safi Logo",
      },
    ],
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardhi Safi | Clean Land, Clear Titles",
    description: "Professional real estate services across Kenya. Licensed by EARB.",
    images: ["/images/brand/logo-dark.jpeg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ardhi Safi Limited",
    image: "https://ardhisafi.co.ke/images/brand/logo-dark.jpeg",
    "@id": "https://ardhisafi.co.ke",
    url: "https://ardhisafi.co.ke",
    telephone: "+254780999100",
    email: "care@ardhisafi.co.ke",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B2-06, Manga House, Kiambere Road, Upper Hill",
      addressLocality: "Nairobi",
      addressCountry: "KE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2982821,
      longitude: 36.8124883
    },
    sameAs: [
      "https://www.linkedin.com/company/ardhisafi",
      "https://www.facebook.com/ardhisafi",
      "https://www.instagram.com/ardhisafi",
      "https://twitter.com/ardhisafi"
    ]
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
