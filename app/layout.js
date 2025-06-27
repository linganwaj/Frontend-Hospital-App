// app/layout.js (Server Component)

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OneSignalInitializer from "./components/OneSignalInitializer";
import ClientOnlyWrapper from "./components/ClientOnlyWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Legacy Clinics App",
  description: "Book appointments and manage healthcare at Legacy Clinics",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <ClientOnlyWrapper>
          <OneSignalInitializer />
        </ClientOnlyWrapper>
        {children}
      </body>
    </html>
  );
}
