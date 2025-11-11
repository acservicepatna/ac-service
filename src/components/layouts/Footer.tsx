'use client';

import * as React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  Users,
  Star,
  MessageCircle,
  Wrench,
  Snowflake,
  Home,
  PhoneCall,
  Headphones,
} from 'lucide-react';

const COMPANY_INFO = {
  name: 'AC Servicing Pro',
  tagline: 'Professional AC Services in Patna',
  description:
    'Expert AC repair, maintenance, installation, and emergency services across Patna, Bihar. Trusted by 5000+ customers with 10+ years of experience.',
  phone: {
    main: '+91 98765 43210',
    emergency: '+91 87654 32109',
  },
  email: 'info@acservicingpro.com',
  address: 'Patna, Bihar, India',
  hours: {
    regular: 'Mon-Sat: 8:00 AM - 8:00 PM',
    emergency: 'Emergency Services: 24/7',
  },
};

const AC_SERVICES = [
  { name: 'AC Repair', href: '/services/repair', icon: Wrench },
  { name: 'AC Maintenance', href: '/services/maintenance', icon: Shield },
  { name: 'AC Installation', href: '/services/installation', icon: Home },
  { name: 'AC Cleaning', href: '/services/cleaning', icon: Snowflake },
  { name: 'Emergency Service', href: '/services/emergency', icon: PhoneCall },
  { name: 'Gas Refilling', href: '/services/gas-refilling', icon: Snowflake },
];

const SERVICE_AREAS = [
  'Boring Road',
  'Kankarbagh',
  'Fraser Road',
  'Bailey Road',
  'Rajendra Nagar',
  'Patliputra',
  'Danapur',
  'Saguna More',
  'Kankarbagh Road',
  'Ashok Rajpath',
  'Exhibition Road',
  'SK Puri',
];

const QUICK_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Book Service', href: '/booking' },
  { name: 'Our Team', href: '/about#team' },
  { name: 'Service Areas', href: '/services#areas' },
  { name: 'Emergency', href: '/services/emergency' },
];

const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Refund Policy', href: '/refund-policy' },
  { name: 'Service Guarantee', href: '/guarantee' },
];


interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleEmergencyCall = () => {
    window.open(`tel:${COMPANY_INFO.phone.emergency}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi, I need AC servicing. Can you help me?'
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${COMPANY_INFO.phone.main}`, '_self');
  };

  return (
    <footer
      className={cn(
        'bg-slate-800 text-white border-t border-slate-700',
        className
      )}
    >
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Information */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-blue-300 mb-2">
                  {COMPANY_INFO.name}
                </h2>
                <p className="text-sm text-slate-300 mb-4">
                  {COMPANY_INFO.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Main Number</p>
                    <p className="text-sm text-slate-300">
                      {COMPANY_INFO.phone.main}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Headphones className="h-4 w-4 text-red-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-400">
                      Emergency 24/7
                    </p>
                    <p className="text-sm text-slate-300">
                      {COMPANY_INFO.phone.emergency}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-sm text-slate-300">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Business Hours</p>
                    <p className="text-xs text-slate-300">
                      {COMPANY_INFO.hours.regular}
                    </p>
                    <p className="text-xs text-red-400">
                      {COMPANY_INFO.hours.emergency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-6 space-y-2">
                <Button onClick={handleCall} className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
              <ul className="space-y-3">
                {AC_SERVICES.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <li key={index}>
                      <Link
                        href={service.href}
                        className="flex items-center gap-3 text-sm text-slate-300 hover:text-blue-400 transition-colors group"
                      >
                        <IconComponent className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>{service.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Service Types */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-2 text-white">AC Types We Service</p>
                <div className="flex flex-wrap gap-1">
                  {['Split AC', 'Window AC', 'Central AC', 'Cassette AC'].map(
                    (type, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-slate-700 text-slate-300 border-slate-600"
                      >
                        {type}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Service Areas in Patna
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {SERVICE_AREAS.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-blue-400 shrink-0" />
                    <span className="text-sm text-slate-300">
                      {area}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coverage Badge */}
              <Card className="mt-4 p-3 bg-slate-700 border-slate-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Complete Coverage</p>
                    <p className="text-xs text-slate-300">
                      All major areas in Patna
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Links & Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 mb-6">
                {QUICK_LINKS.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="text-sm font-semibold mb-3 text-white">Legal & Policies</h4>
              <ul className="space-y-2">
                {LEGAL_LINKS.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Certifications */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-2 text-white">Certifications</p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                    <Shield className="h-3 w-3 mr-1" />
                    Licensed & Insured
                  </Badge>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                    <Star className="h-3 w-3 mr-1" />
                    ISO Certified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency CTA Section */}
      <div className="bg-slate-700 border-t border-slate-600 py-6">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-bold mb-1">
                    AC Emergency? We&apos;re Here 24/7!
                  </h3>
                  <p className="text-red-100 text-sm">
                    Immediate response for urgent AC repairs across Patna
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleEmergencyCall}
                    variant="secondary"
                    className="bg-white text-red-600 hover:bg-red-50 font-semibold"
                  >
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Emergency: {COMPANY_INFO.phone.emergency}
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-red-600"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-900 text-slate-300 py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm">
                © {currentYear} {COMPANY_INFO.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Serving Patna, Bihar
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Licensed & Insured
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">
                Trusted AC Service Provider
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">4.8/5</span>
                <span className="text-slate-400 text-xs">(500+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
