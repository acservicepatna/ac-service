import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Droplets, Sparkles, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'AC Cleaning Patna | Deep Cleaning & Chemical Wash Services',
  description:
    'Professional AC cleaning services in Patna. Deep cleaning, chemical wash, filter cleaning, coil cleaning. Get fresh and efficient cooling. Call 7903735308 for expert AC cleaning service in Patna.',
  keywords:
    'AC cleaning Patna, AC deep cleaning, AC chemical wash, AC filter cleaning, split AC cleaning, window AC cleaning, AC coil cleaning, AC sanitization Patna, AC washing service',
  openGraph: {
    title: 'AC Cleaning Patna | Deep Cleaning & Chemical Wash Services',
    description:
      'Professional AC cleaning services in Patna. Deep cleaning and chemical wash. Call 7903735308',
    type: 'website',
  },
};

export default function ACCleaningPatnaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Professional AC Cleaning Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AC Cleaning Services in Patna
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Expert AC deep cleaning and chemical wash services for all brands and models.
                Get fresh, efficient cooling with our professional cleaning services.
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
              <h2 className="text-3xl font-bold mb-4">Our AC Cleaning Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive cleaning solutions to improve air quality and cooling efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <Droplets className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>AC Deep Cleaning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Thorough cleaning of all internal components
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Deep filter cleaning & replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Evaporator coil cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Condenser coil cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Drain pipe cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Anti-bacterial treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Fan blade cleaning</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-blue-600">₹699 - ₹999</p>
                    <p className="text-sm text-gray-500">30-day service warranty</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-indigo-600 mb-2" />
                  <CardTitle>Chemical Wash Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Advanced chemical cleaning for deep sanitization
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Chemical coil wash</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">High-pressure cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Bacteria & mold removal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Complete sanitization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Odor elimination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Eco-friendly chemicals</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-indigo-600">₹999 - ₹1,499</p>
                    <p className="text-sm text-gray-500">60-day service warranty</p>
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
              <p className="text-gray-600">We provide AC cleaning services across all major areas in Patna</p>
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
            <h2 className="text-3xl font-bold mb-4">Need AC Cleaning Service?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get professional AC cleaning service in Patna. Deep cleaning and chemical wash available.
              Call now for fresh and efficient cooling!
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
