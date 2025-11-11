import type { Metadata } from 'next';
import ServicesPageClient from './client';

export const metadata: Metadata = {
  title:
    'AC Services in Patna | Repair, Maintenance, Installation | AC Servicing Pro',
  description:
    'Complete AC services in Patna - Professional AC repair, maintenance, installation, and cleaning. Expert technicians serving Boring Road, Kankarbagh, Fraser Road, and all Patna areas. Same-day service available.',
  keywords:
    'AC repair service Patna, AC maintenance Patna, AC installation Patna, AC cleaning service, split AC repair, window AC service, central AC maintenance, emergency AC repair Patna, best AC service Patna, AC technician Patna',
  openGraph: {
    title: 'AC Services in Patna | Professional AC Repair & Maintenance',
    description:
      'Expert AC services in Patna. Repair, maintenance, installation, and cleaning for all AC brands. Same-day service across Patna areas.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
