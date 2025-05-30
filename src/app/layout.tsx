import "@/styles/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";
import { metadata } from "@/constants/metadata";
import { quicksandFont, geistMono } from "@/styles/fonts";

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
        className={`${quicksandFont.variable} font-sans ${geistMono.variable} antialiased text-color-foreground`}
      >
        {children}
        <footer className="text-center p-6 mt-4">
          <div className="space-x-6"></div>
          <p className="text-sm mt-4">computer science go brrr</p>
        </footer>
      </body>
    </html>
  );
}
