import type { Metadata } from "next";
import "./globals.css";
import "./GlitchText.css";

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Go Simple',
    description: 'Simplify Tech. Amplify Growth',
    url: 'https://gosimple.io',
    logo: 'https://gosimple.io/logo.svg',
    sameAs: [
      // Add your social media profiles here
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={` font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}