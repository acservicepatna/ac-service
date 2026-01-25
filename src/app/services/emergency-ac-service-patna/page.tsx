import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, AlertCircle, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Emergency AC Service Patna | 24/7 AC Repair | Call 9296746329',
  description:
    '24/7 emergency AC service in Patna. Fast response time, immediate repairs, gas leak repair. Available round the clock for urgent AC issues. Call 9296746329 for emergency AC repair service in Patna.',
  keywords:
    'emergency AC service Patna, 24/7 AC repair, urgent AC repair, emergency gas leak repair, same day AC repair, immediate AC service, AC breakdown service, 24 hour AC repair Patna',
  openGraph: {
    title: 'Emergency AC Service Patna | 24/7 AC Repair | Call 9296746329',
    description:
      '24/7 emergency AC service in Patna. Fast response time and immediate repairs. Call 9296746329',
    type: 'website',
  },
};

export default function EmergencyACServicePatnaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-orange-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                24/7 Emergency AC Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Emergency AC Service in Patna
              </h1>
              <p className="text-xl text-red-100 mb-6">
                24/7 emergency AC repair service available round the clock. Fast response time,
                immediate repairs, and same-day resolution for urgent AC issues.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="tel:+919296746329">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 animate-pulse"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call 9296746329 Now
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Book Emergency Service
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
              <h2 className="text-3xl font-bold mb-4">Our Emergency AC Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fast and reliable emergency services to get your AC running quickly
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 border-red-600">
                <CardHeader>
                  <Clock className="h-10 w-10 text-red-600 mb-2" />
                  <CardTitle>24/7 Emergency Repair</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Round-the-clock emergency AC repair service
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">30-minute response time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Available 24/7, 365 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Emergency diagnostic service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Immediate repair attempts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Same-day resolution focus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Certified emergency technicians</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-2xl font-bold text-red-600">₹999 - ₹2,499</p>
                    <p className="text-sm text-gray-500">Plus repair costs if needed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Emergency Service */}
            <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Our Emergency Service?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Fast Response</h4>
                    <p className="text-sm text-gray-600">We reach you within 30 minutes of your call</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Available 24/7</h4>
                    <p className="text-sm text-gray-600">Round-the-clock service, every day of the year</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Expert Technicians</h4>
                    <p className="text-sm text-gray-600">Certified professionals with emergency training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Immediate Support</h4>
                    <p className="text-sm text-gray-600">Instant phone support and rapid deployment</p>
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
              <h2 className="text-3xl font-bold mb-4">Emergency Service Areas in Patna</h2>
              <p className="text-gray-600">We provide 24/7 emergency AC services across all major areas in Patna</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {['Boring Road', 'Kankarbagh', 'Fraser Road', 'Bailey Road', 'Rajendra Nagar', 'Patliputra', 'Danapur', 'Digha', 'Kidwaipuri', 'Patrakar Nagar'].map((area) => (
                <div key={area} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-orange-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Emergency AC Service?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Get immediate emergency AC repair service in Patna. Available 24/7 for urgent AC issues.
              Call now for fast response and same-day resolution!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+919296746329"><Button
                size="lg"
                className="bg-white text-red-600 hover:bg-red-50 animate-pulse"
                
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency Call: 9296746329
              </Button></Link>
              <Link href="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Book Emergency Service
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
