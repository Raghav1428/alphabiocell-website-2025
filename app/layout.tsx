import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const neuMedium = localFont({
  src: "../public/fonts/NeueHaasDisplayMediu.ttf",
  variable: "--font-neu-medium",
  display: "swap",
});
const neuLight = localFont({
  src: "../public/fonts/NeueHaasDisplayLight.ttf",
  variable: "--font-neu-light",
  weight: "100",
  display: "swap",
});
const neuRoman = localFont({
  src: "../public/fonts/NeueHaasDisplayRoman.ttf",
  variable: "--font-neu-roman",
  weight: "200",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlphaBioCell",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${neuMedium.variable} ${neuLight.variable} ${neuRoman.variable}`}>
        {children}
      </body>
    </html>
  );
}
