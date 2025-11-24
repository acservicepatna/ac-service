import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Calendar, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'AC Maintenance Patna | AMC & Regular Servicing in Bihar',
  description:
    'Regular AC maintenance and AMC services in Patna. Basic maintenance, premium servicing, annual contracts. Keep your AC running efficiently. Call 7903735308 for reliable AC maintenance service in Patna.',
  keywords:
    'AC maintenance Patna, AC AMC, AC servicing Patna, annual maintenance contract, regular AC service, preventive maintenance, AC checkup, AC tune-up, AC service contract Bihar',
  openGraph: {
    title: 'AC Maintenance Patna | AMC & Regular Servicing in Bihar',
    description:
      'Regular AC maintenance and AMC services in Patna. Basic to premium plans available. Call 7903735308',
    type: 'website',
  },
};

export default function ACMaintenancePatnaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Professional AC Maintenance Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AC Maintenance Services in Patna
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Regular AC maintenance and AMC services to keep your air conditioner running
                efficiently. Preventive care for longer AC lifespan and better performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="tel:+917903735308">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call 7903735308
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Book Service Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our AC Maintenance Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive maintenance plans to ensure optimal AC performance year-round
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Basic AC Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Essential maintenance for optimal cooling
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Filter cleaning & inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Coil inspection & cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Refrigerant level check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Drain cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Basic performance check</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-blue-600">₹499</p>
                    <p className="text-sm text-gray-500">Per service visit</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-600">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-600 text-white">Most Popular</Badge>
                  <Calendar className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Annual Maintenance Contract</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Year-round protection with scheduled visits
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">4 scheduled maintenance visits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Priority service response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Free emergency callouts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">20% discount on repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Comprehensive warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Dedicated support</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-green-600">₹4,999 - ₹8,999</p>
                    <p className="text-sm text-gray-500">Annual contract (12 months)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Service Areas in Patna</h2>
              <p className="text-gray-600">We provide AC maintenance services across all major areas in Patna</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {['Boring Road', 'Kankarbagh', 'Fraser Road', 'Bailey Road', 'Rajendra Nagar', 'Patliputra', 'Danapur', 'Digha', 'Kidwaipuri', 'Patrakar Nagar'].map((area) => (
                <div key={area} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need AC Maintenance Service?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get professional AC maintenance service in Patna. Regular servicing and AMC plans available.
              Call now to schedule your maintenance visit!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+917903735308"><Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: 7903735308
              </Button></Link>
              <Link href="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Book Online
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
