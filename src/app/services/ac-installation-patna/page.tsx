import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Hammer, Building2, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'AC Installation Patna | Professional Split & Window AC Installation',
  description:
    'Professional AC installation services in Patna. Window AC, split AC, and central AC installation by certified technicians. Get expert installation for all brands. Call 9296746329 for reliable AC installation service in Patna.',
  keywords:
    'AC installation Patna, split AC installation, window AC installation, central AC installation, AC fitting Patna, new AC installation, AC mounting service, professional AC installation Bihar',
  openGraph: {
    title: 'AC Installation Patna | Professional Split & Window AC Installation',
    description:
      'Professional AC installation services in Patna. Window, split, and central AC installation. Call 9296746329',
    type: 'website',
  },
};

export default function ACInstallationPatnaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Professional AC Installation Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AC Installation Services in Patna
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Expert AC installation services for window, split, and central air conditioners.
                Professional mounting, wiring, and commissioning by certified technicians.
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
              <h2 className="text-3xl font-bold mb-4">Our AC Installation Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional installation services for all types of air conditioners
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Hammer className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Window AC Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Complete window AC installation service
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Wall mounting & fitting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Window frame installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Electrical connection setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Water drainage setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Testing & commissioning</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-blue-600">₹1,999 - ₹2,999</p>
                    <p className="text-sm text-gray-500">30-day installation warranty</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-indigo-600 mb-2" />
                  <CardTitle>Split AC Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Professional split AC installation service
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Indoor & outdoor unit mounting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Professional copper piping work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Electrical wiring & connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Drain pipe installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gas charging & leak test</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">System commissioning</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-indigo-600">₹2,999 - ₹4,499</p>
                    <p className="text-sm text-gray-500">90-day installation warranty</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Central AC Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Complete central AC installation service
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Ductwork installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Unit mounting & setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Complex piping work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Electrical control system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Thermostat installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Complete system testing</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-purple-600">₹9,999 - ₹19,999</p>
                    <p className="text-sm text-gray-500">6-month installation warranty</p>
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
              <p className="text-gray-600">We provide AC installation services across all major areas in Patna</p>
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
            <h2 className="text-3xl font-bold mb-4">Need AC Installation Service?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get professional AC installation service in Patna. Expert installation for all types of ACs.
              Call now for reliable installation service!
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
