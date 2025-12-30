import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Daily Bread - خبزك الطازج كل يوم",
  description: "Daily Bread - نوصلك أطيب خبز محضر بعناية وحب، اشتراك شهري مع توصيل أسبوعي مجاني",
  keywords: ["خبز", "مخبز", "بريوش", "توست", "خبز صحي", "اشتراك شهري", "توصيل", "الكويت"],
  authors: [{ name: "Daily Bread" }],
  openGraph: {
    title: "Daily Bread - خبزك الطازج كل يوم",
    description: "نوصلك أطيب خبز محضر بعناية وحب، اشتراك شهري مع توصيل أسبوعي مجاني",
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
      </body>
    </html>
  );
}
