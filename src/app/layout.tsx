import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lostType = localFont({
  src: "./fonts/LostType2023-Regular.otf",
  variable: "--font-serif",
});

const bolero = localFont({
  src: "./fonts/BoleroesquePhysica.otf",
  variable: "--font-bolero",
});

export const metadata: Metadata = {
  title: "Saigon Bonbon | This is Our Flavor",
  description: "Authentic Vietnamese-inspired flavors you can enjoy now, and every day after.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${lostType.variable} ${bolero.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
