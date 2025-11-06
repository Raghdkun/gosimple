import React from 'react';
import { notFound } from 'next/navigation';
import ServiceDetailClient from '@/components/ServiceDetailClient';
import { getServiceBySlug } from '@/constants/servicesData';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  return <ServiceDetailClient service={service} />;
}
