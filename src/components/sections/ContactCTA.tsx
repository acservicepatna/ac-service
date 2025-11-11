'use client';

import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/Sheet';
import {
  CONTACT_INFO,
  ROUTES,
  BUSINESS_HOURS,
  PATNA_SERVICE_AREAS,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TwoStepQuoteWidget } from '@/components/forms/TwoStepQuoteWidget';
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  Zap,
  MessageCircle,
  X,
  CheckCircle,
  AlertCircle,
  User,
  Settings
} from 'lucide-react';

interface ContactCTAProps {
  className?: string;
  prefillService?: string;
  prefillArea?: string;
}

// Form validation schema
const quickBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[0-9+\s-()]+$/, 'Invalid phone number format'),
  service: z.string().min(1, 'Please select a service'),
});

type QuickBookingForm = z.infer<typeof quickBookingSchema>;

// Available services for quick booking
const QUICK_SERVICES = [
  { value: 'maintenance', label: 'AC Maintenance', icon: Settings },
  { value: 'repair', label: 'AC Repair', icon: Zap },
  { value: 'installation', label: 'AC Installation', icon: Settings },
  { value: 'cleaning', label: 'Deep Cleaning', icon: Settings },
  { value: 'emergency', label: 'Emergency Service', icon: Zap },
  { value: 'gas-refilling', label: 'Gas Refilling', icon: Settings },
];

// Enhanced quick booking form component
function QuickBookingSheetForm({ prefillService, onSuccess }: {
  prefillService?: string;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    reset
  } = useForm<QuickBookingForm>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      service: prefillService || '',
    },
    mode: 'onChange', // Enable real-time validation
  });

  // Watch form values for real-time updates
  const watchedValues = watch();

  // Prefetch booking route for faster navigation
  useEffect(() => {
    router.prefetch(ROUTES.BOOKING);
  }, [router]);

  // Set prefilled service when prop changes
  useEffect(() => {
    if (prefillService) {
      setValue('service', prefillService, { shouldValidate: true });
    }
  }, [prefillService, setValue]);

  const onSubmit = async (data: QuickBookingForm) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Processing your booking request...');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success('Booking request submitted successfully!', {
        duration: 3000,
        icon: '🎉',
      });

      // Redirect to booking page with form data
      const params = new URLSearchParams({
        name: data.name,
        phone: data.phone,
        service: data.service,
        quickBooking: 'true'
      });

      router.push(`${ROUTES.BOOKING}?${params.toString()}`);

      // Reset form
      reset();
      onSuccess?.();

    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        duration: 4000,
        icon: '❌',
      });
    }
  };

  const handleFieldError = (fieldName: keyof QuickBookingForm, error: any) => {
    if (error?.message) {
      toast.error(error.message, {
        duration: 2000,
        position: 'bottom-center',
        icon: '⚠️',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Your Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="Enter your full name"
            className={cn(
              "w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200",
              "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              "placeholder:text-gray-400",
              errors.name
                ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                : watchedValues.name
                ? "border-green-300 bg-green-50"
                : "border-gray-300 bg-white"
            )}
            onBlur={() => errors.name && handleFieldError('name', errors.name)}
          />
          {/* Real-time validation indicator */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {watchedValues.name && !errors.name && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {errors.name && (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.name.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="Your contact number"
            className={cn(
              "w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200",
              "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              "placeholder:text-gray-400",
              errors.phone
                ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                : watchedValues.phone
                ? "border-green-300 bg-green-50"
                : "border-gray-300 bg-white"
            )}
            onBlur={() => errors.phone && handleFieldError('phone', errors.phone)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {watchedValues.phone && !errors.phone && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {errors.phone && (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.phone.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Service Selection */}
      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-semibold text-gray-700">
          Service Needed
        </label>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_SERVICES.map((service) => {
            const IconComponent = service.icon;
            const isSelected = watchedValues.service === service.value;

            return (
              <motion.button
                key={service.value}
                type="button"
                onClick={() => setValue('service', service.value, { shouldValidate: true })}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 text-sm font-medium",
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                )}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
              >
                <IconComponent className={cn(
                  "h-6 w-6",
                  isSelected ? "text-indigo-600" : "text-gray-400"
                )} />
                <span className="text-xs text-center leading-tight">{service.label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1"
                  >
                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          {errors.service && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.service.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={cn(
            "w-full py-4 text-lg font-semibold transition-all duration-200",
            isValid && !isSubmitting
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Processing Request...
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Service Now
            </div>
          )}
        </Button>
      </motion.div>

      {/* Trust indicators */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>Instant Response</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>No Hidden Charges</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>Same Day Service</span>
          </div>
        </div>
      </div>
    </form>
  );
}

// Sticky mobile CTA component
function StickyMobileCTA({ prefillService }: { prefillService?: string }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Hide CTA when sheet is open or when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {isVisible && !isSheetOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: shouldReduceMotion ? 0.1 : 0.5
            }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 shadow-2xl border-t border-indigo-400">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="w-full bg-white text-indigo-600 hover:bg-gray-50 font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Service Now
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] bg-white">
                  <SheetHeader className="text-left pb-6">
                    <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-indigo-600" />
                      Quick Service Booking
                    </SheetTitle>
                    <SheetDescription className="text-gray-600">
                      Fill out the form below and we&apos;ll get back to you within 15 minutes
                    </SheetDescription>
                  </SheetHeader>

                  <div className="overflow-y-auto max-h-[calc(85vh-120px)] pb-6">
                    <QuickBookingSheetForm
                      prefillService={prefillService}
                      onSuccess={() => setIsSheetOpen(false)}
                    />
                  </div>

                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ContactCTA({ className, prefillService, prefillArea }: ContactCTAProps) {
  return (
    <section
      className={cn(
        'py-16 bg-gradient-to-br from-indigo-600 to-blue-700',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - CTA Content */}
          <div className="text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Need AC Service Right Now?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Don&apos;t let a broken AC ruin your comfort. Our expert technicians
              are ready to help 24/7 across Patna.
            </p>

            {/* Emergency Banner */}
            <div className="mt-8 rounded-lg bg-red-600 p-4">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-white mr-3"
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
                <div>
                  <p className="font-semibold text-white">
                    Emergency Service Available
                  </p>
                  <p className="text-red-100 text-sm">
                    Response time: Within 30 minutes in Patna
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  asChild
                >
                  <Link href={`tel:${CONTACT_INFO.phone.emergency}`}>
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Emergency: {CONTACT_INFO.phone.emergency}
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 flex-1"
                  asChild
                >
                  <Link href={`tel:${CONTACT_INFO.phone.primary}`}>
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call: {CONTACT_INFO.phone.primary}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-green-600 border-green-600 text-white hover:bg-green-700 flex-1"
                  asChild
                >
                  <Link
                    href={`https://wa.me/${CONTACT_INFO.phone.whatsapp.replace(/[^0-9]/g, '')}`}
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z" />
                    </svg>
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
              <h3 className="font-semibold text-white mb-2">Business Hours</h3>
              <div className="text-sm text-indigo-100 space-y-1">
                <p>
                  Mon - Fri: {BUSINESS_HOURS.regular.monday.open} -{' '}
                  {BUSINESS_HOURS.regular.monday.close}
                </p>
                <p>
                  Saturday: {BUSINESS_HOURS.regular.saturday.open} -{' '}
                  {BUSINESS_HOURS.regular.saturday.close}
                </p>
                <p>
                  Sunday: {BUSINESS_HOURS.regular.sunday.open} -{' '}
                  {BUSINESS_HOURS.regular.sunday.close}
                </p>
                <p className="text-yellow-200 font-medium">
                  Emergency service: {BUSINESS_HOURS.emergency.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Two-Step Quote Widget */}
          <div>
            <TwoStepQuoteWidget
              prefillService={prefillService}
              prefillArea={prefillArea}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA prefillService={prefillService} />

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: {
            style: {
              border: '1px solid #10b981',
              background: '#ecfdf5',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              background: '#fef2f2',
            },
          },
        }}
      />
    </section>
  );
}
