'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ROUTES, SERVICE_PRICING } from '@/lib/constants';
import { useServices } from '@/hooks/useServices';
import { cn } from '@/utils/cn';
import type { Service } from '@/types';

interface FeaturedServicesProps {
  className?: string;
}

// Define featured services with icons
const FEATURED_SERVICES_CONFIG = [
  {
    id: 'ac-maintenance',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    pricing: SERVICE_PRICING.maintenance.basic,
  },
  {
    id: 'ac-repair',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    pricing: SERVICE_PRICING.repair.minor,
  },
  {
    id: 'ac-installation',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    pricing: SERVICE_PRICING.installation.split,
  },
  {
    id: 'ac-cleaning',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    pricing: SERVICE_PRICING.cleaning.deep,
  },
  {
    id: 'emergency-service',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    pricing: SERVICE_PRICING.emergency.callout,
  },
  {
    id: 'gas-refilling',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    pricing: 1299,
  },
];

export function FeaturedServices({ className }: FeaturedServicesProps) {
  const {
    data: servicesResponse,
    isLoading,
    error,
  } = useServices({ limit: 6, featured: true });

  // Fallback service data for when API is not available
  const fallbackServices: Partial<Service>[] = [
    {
      id: 'ac-maintenance',
      name: 'AC Maintenance & Tune-Up',
      description:
        'Complete AC servicing including filter cleaning, coil maintenance, and performance optimization',
      category: 'maintenance',
      price: { min: SERVICE_PRICING.maintenance.basic, currency: 'INR' },
      duration: 60,
      isEmergency: false,
      availableFor: ['window', 'split', 'tower', 'portable'] as ACType[],
      features: [
        'Filter Cleaning',
        'Coil Maintenance',
        'Performance Check',
        '6 Month Warranty',
      ],
    },
    {
      id: 'ac-repair',
      name: 'AC Repair Service',
      description:
        'Expert diagnosis and repair of all AC issues including cooling problems, electrical faults',
      category: 'repair',
      price: { min: SERVICE_PRICING.repair.minor, currency: 'INR' },
      duration: 75,
      isEmergency: false,
      availableFor: ['window', 'split', 'tower', 'portable'] as ACType[],
      features: [
        'Free Diagnosis',
        'Genuine Parts',
        'Expert Technicians',
        '3 Month Warranty',
      ],
    },
    {
      id: 'ac-installation',
      name: 'AC Installation',
      description:
        'Professional installation of split, window, and central AC systems with warranty',
      category: 'installation',
      price: { min: SERVICE_PRICING.installation.split, currency: 'INR' },
      duration: 180,
      isEmergency: false,
      availableFor: ['split'] as ACType[],
      features: [
        'Professional Installation',
        'Piping & Wiring',
        'Testing',
        '1 Year Warranty',
      ],
    },
    {
      id: 'ac-cleaning',
      name: 'AC Deep Cleaning (Jet Pump)',
      description:
        'Thorough cleaning of AC units including chemical wash and sanitization',
      category: 'cleaning',
      price: { min: SERVICE_PRICING.cleaning.deep, currency: 'INR' },
      duration: 90,
      isEmergency: false,
      availableFor: ['window', 'split', 'cassette'] as ACType[],
      features: [
        'Chemical Wash',
        'Sanitization',
        'Filter Replacement',
        'Performance Boost',
      ],
    },
    {
      id: 'emergency-service',
      name: '24/7 Emergency Service',
      description: 'Round-the-clock emergency AC repair service across Patna',
      category: 'emergency',
      price: { min: SERVICE_PRICING.emergency.callout, currency: 'INR' },
      duration: 60,
      isEmergency: true,
      availableFor: ['window', 'split', 'central', 'cassette', 'tower', 'portable'] as ACType[],
      features: [
        '24/7 Availability',
        'Quick Response',
        'Same Day Service',
        'Emergency Support',
      ],
    },
    {
      id: 'gas-refilling',
      name: 'AC Gas Refilling',
      description:
        'Professional refrigerant gas refilling and leak detection service',
      category: 'maintenance',
      price: { min: 1299, currency: 'INR' },
      duration: 90,
      isEmergency: false,
      availableFor: ['window', 'split', 'central', 'cassette'] as ACType[],
      features: [
        'Leak Detection',
        'Quality Refrigerant',
        'Pressure Testing',
        '6 Month Warranty',
      ],
    },
  ];

  const services = servicesResponse?.data || fallbackServices;

  if (error && !fallbackServices) {
    return (
      <section className={cn('py-16', className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Failed to load services. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Featured Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Professional AC services across Patna with transparent pricing and
            expert technicians
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const config =
              FEATURED_SERVICES_CONFIG[index] || FEATURED_SERVICES_CONFIG[0];

            return (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200"
              >
                <CardHeader className="pb-4">
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-lg',
                      config.bgColor,
                      config.color
                    )}
                  >
                    {config.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  {/* Pricing */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{service.price?.min}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      starting from
                    </span>
                    {service.category === 'emergency' && (
                      <Badge variant="destructive" className="ml-2">
                        24/7 Available
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex w-full gap-2">
                    <Button
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      asChild
                    >
                      <Link href={`${ROUTES.BOOKING}?service=${service.id}`}>
                        Book Now
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`${ROUTES.SERVICES}#${service.id}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            asChild
          >
            <Link href={ROUTES.SERVICES}>
              View All Services
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
