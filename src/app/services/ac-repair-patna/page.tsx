import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield, Wrench, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'AC Repair Patna | Professional AC Repair Services in Bihar',
  description:
    'Expert AC repair services in Patna. Quick fixes for minor issues to major repairs. Compressor repair, PCB repair, cooling system issues. Call 9296746329 for same-day AC repair service in Patna.',
  keywords:
    'AC repair Patna, AC repair service Patna, split AC repair, window AC repair, AC compressor repair, AC PCB repair, AC cooling problem, AC not cooling, AC technician Patna, emergency AC repair',
  openGraph: {
    title: 'AC Repair Patna | Professional AC Repair Services',
    description:
      'Expert AC repair services in Patna. Minor to major repairs. Same-day service available. Call 9296746329',
    type: 'website',
  },
};

export default function ACRepairPatnaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Professional AC Repair Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AC Repair Services in Patna
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Expert AC repair services for all brands and models. Quick fixes to major repairs.
                Same-day service available across Patna.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="tel:+919296746329">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call 9296746329
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
              <h2 className="text-3xl font-bold mb-4">Our AC Repair Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We handle all types of AC repairs from minor issues to major component replacements
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Wrench className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Minor AC Repairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Quick fixes for common issues
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Filter replacement & cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Minor leak repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Electrical connection fixes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Remote control repair</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-blue-600">₹799 - ₹1,299</p>
                    <p className="text-sm text-gray-500">30-day warranty</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-indigo-600 mb-2" />
                  <CardTitle>Major AC Repairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Comprehensive repairs for complex issues
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compressor repair/replacement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">PCB board repair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Cooling system overhaul</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Major component replacement</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-indigo-600">₹1,999 - ₹4,999</p>
                    <p className="text-sm text-gray-500">90-day comprehensive warranty</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-red-600 mb-2" />
                  <CardTitle>Emergency Repairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    24/7 emergency AC repair service
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">30-minute response time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Emergency diagnostic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Immediate repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Same-day resolution</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-red-600">₹599 - ₹1,999</p>
                    <p className="text-sm text-gray-500">Available 24/7</p>
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
              <p className="text-gray-600">We provide AC repair services across all major areas in Patna</p>
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
            <h2 className="text-3xl font-bold mb-4">Need AC Repair Service?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get professional AC repair service in Patna. Same-day service available.
              Call now for immediate assistance!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+919296746329"><Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: 9296746329
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
