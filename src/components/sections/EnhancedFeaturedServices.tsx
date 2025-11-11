'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Clock, Shield, Star, Users, Wrench, Zap, CheckCircle,
  ArrowRight, Plus, X, Eye, Scale, ShoppingCart, Timer
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/HoverCard';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/Sheet';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/Drawer';
import { ROUTES, SERVICE_PRICING } from '@/lib/constants';
import { useServices } from '@/hooks/useServices';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

interface EnhancedFeaturedServicesProps {
  className?: string;
}

// Enhanced service configuration with inclusions data
// Match by service name since IDs are generated dynamically
const FEATURED_SERVICES_CONFIG = [
  {
    name: 'Basic AC Maintenance',
    icon: <Wrench className="h-8 w-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    gradient: 'from-blue-500 to-blue-600',
    inclusions: [
      'Complete filter cleaning & replacement',
      'Coil inspection & maintenance',
      'Electrical connection check',
      'Refrigerant level check',
      'Performance optimization'
    ],
    highlights: ['30-day warranty', 'Genuine Parts', 'Certified Technicians']
  },
  {
    name: 'AC Diagnostic Service',
    icon: <Zap className="h-8 w-8" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    gradient: 'from-red-500 to-red-600',
    inclusions: [
      'Complete system diagnosis',
      'Detailed problem report',
      'Repair cost estimation',
      'Performance analysis',
      'Energy efficiency check',
      'Component identification'
    ],
    highlights: ['Same Day Service', 'Expert Technicians', 'Free Diagnosis'],
    averageDuration: '30-45 minutes',
    isQuickBookable: true,
    isDiagnostic: true
  },
  {
    name: 'Central AC Installation',
    icon: <Users className="h-8 w-8" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    gradient: 'from-green-500 to-green-600',
    inclusions: [
      'System design consultation',
      'Ductwork installation',
      'Central unit mounting',
      'Electrical setup',
      'Zoning configuration',
      'Complete commissioning'
    ],
    highlights: ['3-year warranty', 'Professional Installation', 'Quality Assurance'],
    averageDuration: '6-8 hours',
    isQuickBookable: true
  },
  {
    name: 'AC Deep Cleaning',
    icon: <Shield className="h-8 w-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    gradient: 'from-purple-500 to-purple-600',
    inclusions: [
      'Chemical wash & sanitization',
      'Filter deep cleaning',
      'Coil cleaning & inspection',
      'Antibacterial treatment',
      'Performance optimization'
    ],
    highlights: ['Chemical Wash', 'Sanitization', 'Performance Boost']
  },
  {
    name: '24/7 Emergency Repair',
    icon: <Clock className="h-8 w-8" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    gradient: 'from-orange-500 to-orange-600',
    inclusions: [
      '24/7 emergency response',
      'Same day service guarantee',
      'Priority technician dispatch',
      'Emergency diagnostic',
      'Immediate repair support'
    ],
    highlights: ['24/7 Available', 'Quick Response', 'Emergency Priority']
  },
  {
    name: 'Annual Maintenance Contract (AMC)',
    icon: <Star className="h-8 w-8" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    gradient: 'from-indigo-500 to-indigo-600',
    inclusions: [
      '4 scheduled maintenance visits',
      'Priority emergency support',
      '20% discount on repairs',
      'Free filter replacements',
      'Gas top-up included',
      'Extended warranty coverage'
    ],
    highlights: ['Annual Package', 'Priority Support', 'Cost Savings']
  },
];

// Quick booking confirmation component
function QuickBookingConfirmation({
  service,
  config,
  isOpen,
  onOpenChange
}: {
  service: Partial<Service> & { config?: any };
  config: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isBooking, setIsBooking] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleQuickBook = async () => {
    setIsBooking(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooking(false);
    setShowSuccess(true);

    // Show success then redirect
    setTimeout(() => {
      onOpenChange(false);
      setShowSuccess(false);
      window.location.href = `${ROUTES.BOOKING}?service=${service.id}&quick=true`;
    }, 2000);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-center">
          <DrawerTitle className="flex items-center justify-center gap-3">
            <div className={cn('p-2 rounded-lg', config?.bgColor, config?.color)}>
              {config?.icon}
            </div>
            Quick Book {service.name}
          </DrawerTitle>
          <DrawerDescription>
            {config?.isDiagnostic
              ? 'Get instant diagnosis of your AC issues with our expert technicians'
              : 'Professional installation service with 1-year warranty'
            }
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-6 pb-6 space-y-4">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600">
                Redirecting to complete your booking...
              </p>
            </div>
          ) : (
            <>
              {/* Service details */}
              <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-sm text-gray-600">{config?.averageDuration}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Price</span>
                </div>
                <p className="text-lg font-bold text-indigo-600">₹{service.price?.min}</p>
              </div>
            </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">What&apos;s Included:</h4>
                  <ul className="space-y-1">
                    {config?.inclusions?.slice(0, 4).map((inclusion: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick booking action */}
              <DrawerFooter className="px-0">
                <Button
                  onClick={handleQuickBook}
                  disabled={isBooking}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Book Now - ₹{service.price?.min}
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  View Full Details
                </Button>
              </DrawerFooter>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Service comparison functionality
function ServiceCompareSheet({
  services,
  isOpen,
  onOpenChange
}: {
  services: (Partial<Service> & { config?: any })[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Compare Services
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className={cn(
                    'p-2 rounded-lg',
                    service.config?.bgColor,
                    service.config?.color
                  )}>
                    {service.config?.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{service.price?.min}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">starting</span>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">What&apos;s Included:</h5>
                    <ul className="space-y-1">
                      {service.config?.inclusions?.map((inclusion: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-2">Key Highlights:</h5>
                    <div className="flex flex-wrap gap-1">
                      {service.config?.highlights?.map((highlight: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  size="sm"
                  asChild
                >
                  <Link href={`${ROUTES.BOOKING}?service=${service.id}`}>
                    Book This Service
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Enhanced service card with all features
function EnhancedServiceCard({
  service,
  config,
  index,
  onAddToCompare,
  isInComparison
}: {
  service: Partial<Service>;
  config: any;
  index: number;
  onAddToCompare: (service: any) => void;
  isInComparison: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isQuickBookOpen, setIsQuickBookOpen] = React.useState(false);

  const isQuickBookable = config?.isQuickBookable;


  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 50,
      scale: shouldReduceMotion ? 1 : 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        type: "spring" as const,
        stiffness: shouldReduceMotion ? 300 : 100,
        damping: shouldReduceMotion ? 30 : 15
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: shouldReduceMotion ? 0 : -8,
      rotateX: shouldReduceMotion ? 0 : 5,
      rotateY: shouldReduceMotion ? 0 : 2,
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      style={{ perspective: "1000px" }}
    >
      <motion.div variants={hoverVariants}>
        <Card className="group relative overflow-hidden border-2 hover:border-indigo-200 hover:shadow-2xl transition-all duration-300">
          {/* Background gradient overlay */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none",
            `bg-gradient-to-br ${config.gradient}`
          )} />

          {/* Compare button */}
          <button
            onClick={() => onAddToCompare({ ...service, config })}
            className={cn(
              "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200",
              isInComparison
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white/80 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 shadow-md"
            )}
            aria-label={isInComparison ? "Remove from comparison" : "Add to comparison"}
          >
            {isInComparison ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>

          {/* Popular badge */}
          {(service.category === 'cleaning' || service.category === 'repair') && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="destructive" className="text-xs font-semibold">
                Popular
              </Badge>
            </div>
          )}

          {/* Emergency badge */}
          {service.category === 'emergency' && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs font-semibold">
                24/7 Available
              </Badge>
            </div>
          )}

          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className={cn(
                    'p-3 rounded-xl shadow-lg',
                    config.bgColor,
                    config.color
                  )}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.1,
                    rotate: shouldReduceMotion ? 0 : 5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {config.icon}
                </motion.div>
                <div>
                  <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                    {service.name}
                  </CardTitle>
                  <Badge variant="outline" className={cn('text-xs mt-1', config.bgColor, config.color)}>
                    {service.category?.charAt(0).toUpperCase() + service.category?.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {service.description}
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-indigo-600">
                ₹{service.price?.min?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">starting from</span>
            </div>

            {/* Quick preview of inclusions */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">What&apos;s Included:</h4>
              <ul className="space-y-1">
                {config?.inclusions?.slice(0, 2).map((inclusion: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{inclusion}</span>
                  </li>
                ))}
              </ul>

              {/* Enhanced hover card for diagnostics and installation */}
              <HoverCard openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {isQuickBookable ? 'View details & quick book' : 'View all inclusions'}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="top">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('p-2 rounded-lg', config.bgColor, config.color)}>
                        {config.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        {config?.averageDuration && (
                          <p className="text-xs text-gray-500">Duration: {config.averageDuration}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Complete Service Includes:</h5>
                      <ul className="space-y-1.5">
                        {config?.inclusions?.map((inclusion: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{inclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Key Highlights:</h5>
                      <div className="flex flex-wrap gap-1">
                        {config?.highlights?.map((highlight: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-4 text-sm mb-3">
                        {config?.averageDuration && (
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4 text-gray-500" />
                            <span>{config.averageDuration}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span>Warranty included</span>
                        </div>
                      </div>

                      {/* Quick book action for diagnostics and installation */}
                      {isQuickBookable && (
                        <Button
                          onClick={() => setIsQuickBookOpen(true)}
                          size="sm"
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                          <ShoppingCart className="w-3 h-3 mr-2" />
                          Quick Book - ₹{service.price?.min}
                        </Button>
                      )}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>

          <CardFooter className="pt-0 space-y-3">
            <div className="flex gap-2 w-full">
              {isQuickBookable ? (
                <>
                  <Button
                    onClick={() => setIsQuickBookOpen(true)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Quick Book
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`${ROUTES.SERVICES}#${service.id}`}>
                      Details
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
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
                </>
              )}
            </div>

            {/* Rating and booking info */}
            <div className="flex items-center justify-between w-full text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-yellow-400" />
                <span>4.8 (1,200+ bookings)</span>
              </div>
              {service.category === 'emergency' && (
                <span className="text-orange-600 font-medium">Same-day service</span>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Quick booking drawer for diagnostics and installation */}
      {isQuickBookable && (
        <QuickBookingConfirmation
          service={service}
          config={config}
          isOpen={isQuickBookOpen}
          onOpenChange={setIsQuickBookOpen}
        />
      )}
    </motion.div>
  );
}

export function EnhancedFeaturedServices({ className }: EnhancedFeaturedServicesProps) {
  const [compareServices, setCompareServices] = React.useState<any[]>([]);
  const [isCompareOpen, setIsCompareOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    data: servicesResponse,
    isLoading,
    error,
  } = useServices({ limit: 6 });

  // Fallback service data
  const fallbackServices: Partial<Service>[] = [
    {
      id: 'ac-maintenance',
      name: 'AC Maintenance & Tune-Up',
      description: 'Complete AC servicing including filter cleaning, coil maintenance, and performance optimization',
      category: 'maintenance',
      price: { min: SERVICE_PRICING.maintenance.basic, currency: 'INR' },
    },
    {
      id: 'ac-repair',
      name: 'AC Repair Service',
      description: 'Expert diagnosis and repair of all AC issues including cooling problems, electrical faults',
      category: 'repair',
      price: { min: SERVICE_PRICING.repair.minor, currency: 'INR' },
    },
    {
      id: 'ac-installation',
      name: 'AC Installation',
      description: 'Professional installation of split, window, and central AC systems with warranty',
      category: 'installation',
      price: { min: SERVICE_PRICING.installation.split, currency: 'INR' },
    },
    {
      id: 'ac-cleaning',
      name: 'Deep AC Cleaning',
      description: 'Thorough cleaning of AC units including chemical wash and sanitization',
      category: 'cleaning',
      price: { min: SERVICE_PRICING.cleaning.deep, currency: 'INR' },
    },
    {
      id: 'emergency-service',
      name: '24/7 Emergency Service',
      description: 'Round-the-clock emergency AC repair service across Patna',
      category: 'emergency',
      price: { min: SERVICE_PRICING.emergency.callout, currency: 'INR' },
    },
    {
      id: 'gas-refilling',
      name: 'AC Gas Refilling',
      description: 'Professional refrigerant gas refilling and leak detection service',
      category: 'maintenance',
      price: { min: 1299, currency: 'INR' },
    },
  ];

  const services = servicesResponse?.data || fallbackServices;


  const handleAddToCompare = (service: any) => {
    const isAlreadyInComparison = compareServices.some(s => s.id === service.id);

    if (isAlreadyInComparison) {
      setCompareServices(prev => prev.filter(s => s.id !== service.id));
    } else if (compareServices.length < 3) {
      setCompareServices(prev => [...prev, service]);
    }
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

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
    <section className={cn('py-16 bg-gradient-to-b from-gray-50 to-white', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Featured Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Professional AC services across Patna with transparent pricing and expert technicians
          </p>

          {/* Compare services toggle */}
          {compareServices.length > 0 && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={() => setIsCompareOpen(true)}
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                <Scale className="w-4 h-4 mr-2" />
                Compare Services ({compareServices.length})
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const config = FEATURED_SERVICES_CONFIG.find(c => c.name === service.name) || FEATURED_SERVICES_CONFIG[0];
            const isInComparison = compareServices.some(s => s.id === service.id);


            return (
              <EnhancedServiceCard
                key={service.id}
                service={service}
                config={config}
                index={index}
                onAddToCompare={handleAddToCompare}
                isInComparison={isInComparison}
              />
            );
          })}
        </motion.div>

        {/* View All Services CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: shouldReduceMotion ? 0.2 : 0.6 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link href={ROUTES.SERVICES}>
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Compare Services Sheet */}
        <ServiceCompareSheet
          services={compareServices}
          isOpen={isCompareOpen}
          onOpenChange={setIsCompareOpen}
        />
      </div>
    </section>
  );
}