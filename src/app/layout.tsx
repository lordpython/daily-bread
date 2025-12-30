import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Daily Bread - مخبز يومي | خبز طازج يومي",
  description: "Daily Bread - مخبز منزلي يقدم خبز طازج يومي مع خدمة اشتراك شهرية. توصيل ٤ مرات بالأسبوع",
  keywords: ["خبز", "مخبز", "بريوش", "توست", "خبز صحي", "اشتراك شهري", "توصيل", "الكويت"],
  authors: [{ name: "Daily Bread" }],
  openGraph: {
    title: "Daily Bread - مخبز يومي | خبز طازج يومي",
    description: "مخبز منزلي يقدم خبز طازج يومي مع خدمة اشتراك شهرية",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
