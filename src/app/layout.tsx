import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AC Servicing Pro | Professional AC Services in Patna, Bihar',
  description:
    'Expert AC maintenance, repair, and installation services in Patna. Serving Boring Road, Kankarbagh, Fraser Road, and all Patna areas. 24/7 emergency AC repair with certified technicians.',
  keywords:
    'AC repair Patna, air conditioning service Patna, HVAC maintenance Bihar, AC installation Patna, AC service Boring Road, AC repair Kankarbagh, emergency AC service Patna, best AC technician Patna',
  authors: [{ name: 'AC Servicing Pro Team' }],
  openGraph: {
    title: 'AC Servicing Pro | Professional AC Services in Patna, Bihar',
    description:
      'Expert AC maintenance, repair, and installation services in Patna. 24/7 emergency support with certified technicians across all Patna areas.',
    type: 'website',
    locale: 'en_IN',
  },
  other: {
    'geo.region': 'IN-BR',
    'geo.placename': 'Patna',
    'geo.position': '25.5941;85.1376',
    ICBM: '25.5941, 85.1376',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-background">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
