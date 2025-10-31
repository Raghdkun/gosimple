import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./GlitchText.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Go Simple",
    template: "%s | Go Simple"
  },
  description: "Go Simple - Simplify Tech. Amplify Growth",
  keywords: ["go simple", "simplicity", "elegant solutions", "minimalism"],
  authors: [{ name: "Go Simple Team" }],
  creator: "Go Simple",
  publisher: "Raghdkun",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://gosimple.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Go Simple",
    description: "Simplify Tech. Amplify Growth",
    url: '/',
    siteName: "Go Simple",
    images: [
      {
        url: '/logo.svg',
        width: 200,
        height: 200,
        alt: 'Go Simple Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Go Simple",
    description: "Simplify Tech. Amplify Growth",
    images: ['/logo.svg'],
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
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}