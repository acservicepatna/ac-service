'use client';

import * as React from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Clock,
  Star,
  CheckCircle,
  X,
  Calendar,
  TrendingUp,
  Users,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/Sheet';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/HoverCard';
import { cn } from '@/lib/utils';

interface AMCComparisonSliceProps {
  className?: string;
}

// Hook for animated counter
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (isInView) {
      const animationDuration = shouldReduceMotion ? 100 : duration;
      const steps = shouldReduceMotion ? 1 : 60;
      const increment = end / steps;
      const stepDuration = animationDuration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration, shouldReduceMotion]);

  return { count, ref };
}

// Confirmation animation component
function BookingConfirmation({
  isVisible,
  onComplete
}: {
  isVisible: boolean;
  onComplete: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onComplete, shouldReduceMotion ? 500 : 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 100, scale: shouldReduceMotion ? 1 : 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 100, scale: shouldReduceMotion ? 1 : 0.8 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.3,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: shouldReduceMotion ? 0 : 360 }}
            transition={{ delay: 0.1, duration: shouldReduceMotion ? 0.1 : 0.5 }}
          >
            <CheckCircle className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">Added to booking!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Detailed comparison sheet
function DetailedComparisonSheet({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  const amcFeatures = [
    'Bi-annual comprehensive servicing',
    'Priority emergency response',
    'Free minor repairs & adjustments',
    'Genuine spare parts warranty',
    'Performance monitoring & reports',
    'Seasonal maintenance reminders',
    'Technician relationship continuity',
    'Extended equipment lifespan'
  ];

  const oneTimeFeatures = [
    'Single service appointment',
    'Standard response time',
    'Basic cleaning & maintenance',
    'Limited warranty period',
    'No ongoing relationship',
    'Pay-per-service pricing'
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            AMC vs One-Time Service Comparison
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">67%</div>
              <div className="text-sm text-gray-600">Cost Savings with AMC</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2x</div>
              <div className="text-sm text-gray-600">Faster Response Time</div>
            </div>
          </div>

          {/* Detailed Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AMC Benefits */}
            <motion.div
              className="border rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-blue-50"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: shouldReduceMotion ? 0.1 : 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900">Annual Maintenance Contract</h3>
                  <p className="text-sm text-indigo-600">Comprehensive Care Plan</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Annual Cost</span>
                  <span className="font-bold text-indigo-600">₹4,999</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Service Visits</span>
                  <span className="font-bold text-indigo-600">4+ visits/year</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Response Time</span>
                  <span className="font-bold text-indigo-600">Same day</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {amcFeatures.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: shouldReduceMotion ? 0.1 : 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700">
                Choose AMC Plan
              </Button>
            </motion.div>

            {/* One-Time Service */}
            <motion.div
              className="border rounded-lg p-6 bg-gradient-to-br from-gray-50 to-slate-50"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: shouldReduceMotion ? 0.1 : 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-600 text-white rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">One-Time Service</h3>
                  <p className="text-sm text-gray-600">Pay-per-Visit Basis</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Per Visit Cost</span>
                  <span className="font-bold text-gray-600">₹799-₹1,999</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Annual Visits</span>
                  <span className="font-bold text-gray-600">2-3 visits/year</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Response Time</span>
                  <span className="font-bold text-gray-600">24-48 hours</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {oneTimeFeatures.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: shouldReduceMotion ? 0.1 : 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full mt-6">
                Book One-Time Service
              </Button>
            </motion.div>
          </div>

          {/* Value Proposition */}
          <motion.div
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-6"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: shouldReduceMotion ? 0.1 : 0.4 }}
          >
            <h3 className="font-semibold mb-2">Why Choose AMC?</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Save money, get priority service, and ensure your AC runs efficiently year-round with our comprehensive maintenance contract.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>5000+ AMC customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AMCComparisonSlice({ className }: AMCComparisonSliceProps) {
  const [isDetailSheetOpen, setIsDetailSheetOpen] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Animated counters
  const visitsCounter = useAnimatedCounter(4);
  const savingsCounter = useAnimatedCounter(67);
  const responseCounter = useAnimatedCounter(24);

  const handleBookingAdd = () => {
    setShowConfirmation(true);
  };

  return (
    <section className={cn('py-12 bg-gradient-to-b from-white to-indigo-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AMC vs One-Time Service
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare our Annual Maintenance Contract with one-time services to see the value
          </p>
        </motion.div>

        {/* Compact Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AMC Card */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: shouldReduceMotion ? 0.1 : 0.5 }}
          >
            <Card className="relative overflow-hidden border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                Recommended
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-600 text-white rounded-xl">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-indigo-900">Annual Maintenance Contract</CardTitle>
                    <p className="text-sm text-indigo-600">Comprehensive Care Plan</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      <span ref={visitsCounter.ref}>{visitsCounter.count}</span>+
                    </div>
                    <div className="text-xs text-gray-600">visits/year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      <span ref={savingsCounter.ref}>{savingsCounter.count}</span>%
                    </div>
                    <div className="text-xs text-gray-600">cost saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      <span ref={responseCounter.ref}>{responseCounter.count}</span>h
                    </div>
                    <div className="text-xs text-gray-600">priority slots</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Annual Investment</span>
                    <span className="text-lg font-bold text-indigo-600">₹4,999</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Per service cost</span>
                    <span>₹1,249</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Key Benefits:</h4>
                  <ul className="space-y-1 text-sm">
                    {['Priority emergency response', 'Free minor repairs', 'Bi-annual deep cleaning'].map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleBookingAdd}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Choose AMC Plan
                  </Button>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="w-full text-xs text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1">
                        <Info className="w-3 h-3" />
                        What's included in AMC?
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Complete AMC Package Includes:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>4 scheduled maintenance visits per year</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Priority emergency response (same day)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Free minor repairs and adjustments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Genuine spare parts with warranty</span>
                          </li>
                        </ul>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* One-Time Service Card */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: shouldReduceMotion ? 0.1 : 0.5 }}
          >
            <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-600 text-white rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">One-Time Service</CardTitle>
                    <p className="text-sm text-gray-600">Pay-per-Visit Basis</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">2-3</div>
                    <div className="text-xs text-gray-600">visits/year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">0%</div>
                    <div className="text-xs text-gray-600">cost saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">48h</div>
                    <div className="text-xs text-gray-600">standard slots</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Per Service Cost</span>
                    <span className="text-lg font-bold text-gray-600">₹799-₹1,999</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Annual cost (3 visits)</span>
                    <span>₹2,397-₹5,997</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What's Included:</h4>
                  <ul className="space-y-1 text-sm">
                    {['Basic cleaning & maintenance', 'Standard warranty', 'Regular response time'].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  Book One-Time Service
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: shouldReduceMotion ? 0.1 : 0.5 }}
        >
          <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                View Detailed Comparison
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </SheetTrigger>
            <DetailedComparisonSheet
              isOpen={isDetailSheetOpen}
              onOpenChange={setIsDetailSheetOpen}
            />
          </Sheet>
        </motion.div>

        {/* Booking Confirmation */}
        <BookingConfirmation
          isVisible={showConfirmation}
          onComplete={() => setShowConfirmation(false)}
        />
      </div>
    </section>
  );
}