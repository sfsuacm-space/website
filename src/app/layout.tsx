import type { Metadata } from "next";
import { Geist_Mono, Quicksand } from "next/font/google";
import "./styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";

const quicksandFont = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: true,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACM at SFSU",
  icons: "/assets/logos/avatar-logo.png",
  description:
    "The premiere computer science club @ San Fransisco State University. We focus on community, professional and academic development, and touching grass. 🍃",
  openGraph: {
    title: "ACM at SFSU",
    description: "A little website for our chapter <3",
    url: "https://www.sfsuacm.org/",
    siteName: "My Site",
    images: [{ url: "https://example.com/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Head>
          {/* Add metadata */}
          <title>
            <title>{metadata.title?.toString()}</title>
          </title>
          <meta name="description" content={metadata.description?.toString()} />
          <link rel="icon" href={metadata.icons?.toString()} />
          <link rel="shortcut icon" href={metadata.icons?.toString()} />
          <link rel="apple-touch-icon" href={metadata.icons?.toString()} />
        </Head>
      </head>

      <body
        className={`${quicksandFont.variable} font-sans ${geistMono.variable} antialiased  `}
      >
        {children}
        <footer className="text-center p-6 mt-8">
          <div className="space-x-6"></div>
          <p className="text-sm mt-4">
            &copy; 2025 ACM@SFSU. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
