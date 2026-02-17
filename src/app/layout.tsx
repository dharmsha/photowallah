import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vatsstudio.com"),

  title: {
    default: "VatsStudio - Wedding Photography & Cinematography Experts",
    template: "%s | VatsStudio",
  },

  description:
    "VatsStudio provides professional wedding photography, pre-wedding shoots, cinematic wedding films, candid photography, engagement photography, and event coverage across India. Capture your special moments with creativity and perfection.",

  keywords: [
    "VatsStudio",
    "Wedding Photography",
    "Wedding Photographer in India",
    "Best Wedding Photographer",
    "Pre Wedding Shoot",
    "Candid Wedding Photography",
    "Wedding Cinematography",
    "Wedding Videography",
    "Engagement Photography",
    "Haldi Ceremony Photography",
    "Mehndi Photography",
    "Bridal Photoshoot",
    "Groom Photoshoot",
    "Event Photography",
    "Professional Photographer",
    "Destination Wedding Photographer",
    "Luxury Wedding Photography",
    "Wedding Film Maker",
    "Photography Services India",
  ],

  authors: [{ name: "VatsStudio Team" }],
  creator: "VatsStudio",
  publisher: "VatsStudio",

  openGraph: {
    title: "VatsStudio - Wedding Photography Specialists",
    description:
      "Professional wedding photography and cinematic wedding films capturing timeless memories.",
    url: "https://vatsstudio.com",
    siteName: "VatsStudio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VatsStudio Wedding Photography",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VatsStudio - Wedding Photography Experts",
    description:
      "Book professional wedding photographers for candid, cinematic and destination weddings.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://vatsstudio.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-800`}>
        <ThemeRegistry>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeRegistry>

        {/* Local Business Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "VatsStudio",
              url: "https://vatsstudio.com",
              description:
                "Professional wedding photography and cinematography services in India.",
              areaServed: "India",
              serviceType: "Wedding Photography",
            }),
          }}
        />
      </body>
    </html>
  );
}
