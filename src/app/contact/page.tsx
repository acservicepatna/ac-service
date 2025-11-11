import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

import {
  CONTACT_INFO,
  BUSINESS_HOURS,
  PATNA_SERVICE_AREAS,
  EMERGENCY_RESPONSE,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact AC Servicing Pro Patna | Call +91-9876543210 | 24/7 Service',
  description:
    'Contact AC Servicing Pro in Patna for professional AC services. Call +91-9876543210 for immediate assistance. Visit our Bailey Road office or get 24/7 emergency service across all Patna areas.',
  keywords:
    'contact AC Servicing Pro Patna, AC service phone number Patna, AC repair contact Bailey Road, emergency AC service number, AC technician contact Patna, AC service address Bihar',
  openGraph: {
    title: 'Contact AC Servicing Pro | 24/7 AC Service in Patna',
    description:
      'Contact us for professional AC services in Patna. 24/7 emergency support available. Call +91-9876543210 or visit our Bailey Road office.',
    type: 'website',
  },
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone Support',
    primary: CONTACT_INFO.phone.primary,
    secondary: 'Emergency: ' + CONTACT_INFO.phone.emergency,
    description: '24/7 support for all your AC needs',
    action: 'Call Now',
    href: `tel:${CONTACT_INFO.phone.primary}`,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    primary: CONTACT_INFO.phone.whatsapp,
    secondary: 'Quick response guaranteed',
    description: 'Send us a message for instant support',
    action: 'Message on WhatsApp',
    href: `https://wa.me/${CONTACT_INFO.phone.whatsapp.replace(/[^0-9]/g, '')}`,
  },
  {
    icon: Mail,
    title: 'Email Support',
    primary: CONTACT_INFO.email.primary,
    secondary: 'Support: ' + CONTACT_INFO.email.support,
    description: 'Send us your queries and requirements',
    action: 'Send Email',
    href: `mailto:${CONTACT_INFO.email.primary}`,
  },
  {
    icon: MapPin,
    title: 'Visit Our Office',
    primary: `${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.area}`,
    secondary: `${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state} ${CONTACT_INFO.address.pincode}`,
    description: 'Meet us in person for detailed consultation',
    action: 'Get Directions',
    href: `https://maps.google.com?q=${CONTACT_INFO.coordinates.latitude},${CONTACT_INFO.coordinates.longitude}`,
  },
];

const operatingHours = [
  {
    day: 'Monday - Friday',
    hours: `${BUSINESS_HOURS.regular.monday.open} - ${BUSINESS_HOURS.regular.monday.close}`,
  },
  {
    day: 'Saturday',
    hours: `${BUSINESS_HOURS.regular.saturday.open} - ${BUSINESS_HOURS.regular.saturday.close}`,
  },
  {
    day: 'Sunday',
    hours: `${BUSINESS_HOURS.regular.sunday.open} - ${BUSINESS_HOURS.regular.sunday.close}`,
  },
  { day: 'Emergency Service', hours: BUSINESS_HOURS.emergency.hours },
];

export default function ContactPage() {
  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Get in touch for professional AC services in Patna. We&apos;re
              here to help with all your air conditioning needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Multiple ways to reach us for immediate assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map(method => {
              const IconComponent = method.icon;
              return (
                <Card key={method.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">
                        {method.primary}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {method.secondary}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <Button asChild className="w-full">
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : '_self'}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        {method.action}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Service Banner */}
      <section className="py-12 bg-destructive text-destructive-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h2 className="text-2xl font-bold">
                Emergency AC Service Available 24/7
              </h2>
            </div>
            <p className="text-lg mb-6 opacity-90">
              AC not working? Don&apos;t suffer in the heat! Call us now for
              immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-lg">
                Emergency Hotline:{' '}
                <span className="font-bold text-2xl">
                  {CONTACT_INFO.phone.emergency}
                </span>
              </div>
              <Button asChild variant="secondary" size="lg">
                <a href={`tel:${CONTACT_INFO.phone.emergency}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Service
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Location */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Business Hours
              </h3>
              <div className="space-y-4">
                {operatingHours.map(item => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-2 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-900">
                      {item.day}
                    </span>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> {BUSINESS_HOURS.emergency.description}
                </p>
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Office Location
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address:</h4>
                  <p className="text-gray-600">
                    {CONTACT_INFO.address.street}
                    <br />
                    {CONTACT_INFO.address.area}
                    <br />
                    {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}{' '}
                    {CONTACT_INFO.address.pincode}
                    <br />
                    {CONTACT_INFO.address.country}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Landmarks:
                  </h4>
                  <p className="text-gray-600">
                    Near Hartali More, Close to Bailey Road Market
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={`https://maps.google.com?q=${CONTACT_INFO.coordinates.latitude},${CONTACT_INFO.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Areas in Patna
            </h2>
            <p className="text-lg text-gray-600">
              We provide professional AC services across these Patna areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATNA_SERVICE_AREAS.map(area => (
              <div key={area.name} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Pincode: {area.pincode}
                </p>
                <p className="text-sm text-gray-500">
                  Near: {area.landmarks.join(', ')}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Don&apos;t see your area listed? We may still serve your location.
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Call to Check Service Availability
            </a>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Response Times
            </h2>
            <p className="text-lg text-muted-foreground">
              Fast, reliable service when you need it most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Within Patna City
                </h3>
                <p className="text-2xl font-bold text-primary mb-2">
                  {EMERGENCY_RESPONSE.withinPatna}
                </p>
                <p className="text-sm text-muted-foreground">Emergency response time</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nearby Areas
                </h3>
                <p className="text-2xl font-bold text-primary mb-2">
                  {EMERGENCY_RESPONSE.nearbyAreas}
                </p>
                <p className="text-sm text-muted-foreground">Extended city limits</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Outskirt Areas
                </h3>
                <p className="text-2xl font-bold text-primary mb-2">
                  {EMERGENCY_RESPONSE.farAreas}
                </p>
                <p className="text-sm text-muted-foreground">Maximum response time</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            * {EMERGENCY_RESPONSE.conditions}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don&apos;t wait for your AC problems to get worse. Contact us today
            for professional, reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/booking">
                Book Service Online
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call: {CONTACT_INFO.phone.primary}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
