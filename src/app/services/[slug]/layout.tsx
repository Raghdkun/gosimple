import { Metadata } from 'next';
import { getServiceBySlug, getAllServiceSlugs } from '@/constants/servicesData';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | GoSimple',
      description: 'The service you are looking for does not exist.',
    };
  }

  return {
    title: `${service.title} | GoSimple`,
    description: service.description,
    keywords: [
      service.title,
      service.shortTitle,
      'GoSimple',
      'web development',
      'app development',
      'automation',
      'AI',
      'SaaS',
      'data analytics',
    ],
    openGraph: {
      title: `${service.title} | GoSimple`,
      description: service.description,
      type: 'website',
      url: `https://gosimple.io/services/${service.slug}`,
      siteName: 'GoSimple',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | GoSimple`,
      description: service.description,
    },
    alternates: {
      canonical: `https://gosimple.io/services/${service.slug}`,
    },
  };
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
