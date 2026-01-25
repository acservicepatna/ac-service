import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Wind, Gauge, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'AC Gas Refilling Patna | Refrigerant Recharge Services in Bihar',
  description:
    'Professional AC gas refilling and refrigerant recharge services in Patna. Leak detection, pressure check, fresh gas filling. Get better cooling performance. Call 9296746329 for expert AC gas refilling service in Patna.',
  keywords:
    'AC gas refilling Patna, AC gas charging, refrigerant refilling, AC gas leak repair, AC cooling gas, R32 gas refilling, R410A gas, AC gas top up, AC not cooling Patna',
  openGraph: {
    title: 'AC Gas Refilling Patna | Refrigerant Recharge Services in Bihar',
    description:
      'Professional AC gas refilling services in Patna. Leak detection and fresh gas filling. Call 9296746329',
    type: 'website',
  },
};

export default function ACGasRefillingPatnaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Professional Gas Refilling Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AC Gas Refilling Services in Patna
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Expert AC gas refilling and refrigerant recharge services. Complete leak detection,
                pressure testing, and fresh gas filling for optimal cooling performance.
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
              <h2 className="text-3xl font-bold mb-4">Our AC Gas Refilling Service</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive gas refilling service with leak detection and performance testing
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto">
              <Card className="border-2 border-blue-600">
                <CardHeader>
                  <Wind className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Complete Gas Refilling Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Professional refrigerant recharge with comprehensive testing
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Complete leak detection test</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">System pressure check</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Leak repair (if required)</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Gas evacuation & vacuum test</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Fresh refrigerant gas filling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Performance testing & verification</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">₹1,299 - ₹2,499</p>
                        <p className="text-sm text-gray-500">Includes gas & service</p>
                      </div>
                      <Badge className="bg-green-600 text-white">60-day warranty</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supported Gas Types */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Supported Refrigerant Types</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <Gauge className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">R32 Refrigerant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Modern eco-friendly refrigerant for new AC models
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Gauge className="h-8 w-8 text-indigo-600 mb-2" />
                    <CardTitle className="text-lg">R410A Refrigerant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      High-performance refrigerant for split ACs
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Gauge className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-lg">R22 Refrigerant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Traditional refrigerant for older AC models
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Signs You Need Gas Refilling */}
            <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">Signs You Need Gas Refilling</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Poor Cooling</h4>
                    <p className="text-sm text-gray-600">AC not cooling properly or taking too long</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Ice Formation</h4>
                    <p className="text-sm text-gray-600">Ice buildup on indoor or outdoor unit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Hissing Sounds</h4>
                    <p className="text-sm text-gray-600">Strange noises indicating gas leak</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Higher Bills</h4>
                    <p className="text-sm text-gray-600">Increased electricity consumption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Service Areas in Patna</h2>
              <p className="text-gray-600">We provide AC gas refilling services across all major areas in Patna</p>
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
            <h2 className="text-3xl font-bold mb-4">Need AC Gas Refilling Service?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get professional AC gas refilling service in Patna. Complete leak detection and fresh gas filling.
              Call now for better cooling performance!
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
