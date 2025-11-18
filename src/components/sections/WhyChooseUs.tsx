'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { EMERGENCY_RESPONSE, PATNA_SERVICE_AREAS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Clock,
  Shield,
  AlertTriangle,
  Users,
  ShieldCheck,
  MapPin,
  CheckCircle,
  DollarSign,
  MessageCircle,
  Award,
  Zap,
  Star,
  Phone,
  Calendar
} from 'lucide-react';

interface WhyChooseUsProps {
  className?: string;
}

const FEATURES = [
  {
    id: 'experience',
    title: '10+ Years Experience',
    description: 'Serving Patna since 2014 with expert AC solutions and customer satisfaction',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'group-hover:bg-blue-100',
    stat: '10+',
    statLabel: 'Years',
    badge: null,
  },
  {
    id: 'certified',
    title: 'Certified Technicians',
    description: 'All our technicians are certified, licensed, and regularly trained on latest AC technologies',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'group-hover:bg-green-100',
    stat: '15+',
    statLabel: 'Certified Techs',
    badge: {
      text: 'Certified Technicians',
      hoverContent: {
        title: 'Professional Certifications',
        details: [
          'HVAC certified professionals with 5+ years experience',
          'Regular training on latest AC technologies and repair methods'
        ],
        credentials: ['HVAC License', 'Safety Training', 'Manufacturer Certified']
      }
    },
  },
  {
    id: 'emergency',
    title: '24/7 Emergency Service',
    description: `Quick response within ${EMERGENCY_RESPONSE.withinPatna} across Patna for urgent AC issues`,
    icon: Zap,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    hoverColor: 'group-hover:bg-red-100',
    stat: '24/7',
    statLabel: 'Emergency',
    badge: {
      text: '30min Response',
      hoverContent: {
        title: 'Emergency Response Promise',
        details: [
          'Guaranteed response within 30 minutes in Patna city limits',
          'On-call technicians available round the clock for urgent repairs'
        ],
        credentials: ['24/7 Hotline', 'GPS Tracked', 'Priority Support']
      }
    },
  },
  {
    id: 'customers',
    title: '5000+ Happy Customers',
    description: 'Trusted by thousands of residential and commercial customers across Patna',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'group-hover:bg-purple-100',
    stat: '5000+',
    statLabel: 'Customers',
    badge: null,
  },
  {
    id: 'warranty',
    title: 'Comprehensive Warranty',
    description: 'Up to 1 year warranty on installations and 6 months on repairs with genuine parts',
    icon: ShieldCheck,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    hoverColor: 'group-hover:bg-indigo-100',
    stat: '1 Year',
    statLabel: 'Warranty',
    badge: {
      text: 'Extended Warranty',
      hoverContent: {
        title: 'Warranty Coverage Details',
        details: [
          '1 year full warranty on new installations and replacement parts',
          '6 months warranty on all repair work with genuine OEM components'
        ],
        credentials: ['Parts Warranty', 'Labor Guarantee', 'Service Protection']
      }
    },
  },
  {
    id: 'coverage',
    title: 'Wide Service Coverage',
    description: `Covering ${PATNA_SERVICE_AREAS.length}+ areas across Patna with same-day service availability`,
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    hoverColor: 'group-hover:bg-orange-100',
    stat: `${PATNA_SERVICE_AREAS.length}+`,
    statLabel: 'Areas',
    badge: null,
  },
];

const STATS = [
  {
    label: 'Years in Business',
    value: '10+',
    numericValue: 10,
    suffix: '+',
    prefix: '',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: Clock,
    description: 'Years of trusted AC service in Patna'
  },
  {
    label: 'Happy Customers',
    value: '5000+',
    numericValue: 5000,
    suffix: '+',
    prefix: '',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    icon: Users,
    description: 'Satisfied customers across Patna'
  },
  {
    label: 'Jobs Completed',
    value: '15000+',
    numericValue: 15000,
    suffix: '+',
    prefix: '',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: CheckCircle,
    description: 'Successfully completed service calls'
  },
  {
    label: 'Avg Response Time',
    value: '30 min',
    numericValue: 30,
    suffix: ' min',
    prefix: '',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: Zap,
    description: 'Average emergency response time'
  },
];

// Custom hook for animated counters with swift-to-gentle easing
function useAnimatedCounter(end: number, duration: number = 2500, delay: number = 0) {
  const [count, setCount] = React.useState(0);
  const [isStarted, setIsStarted] = React.useState(false);
  const countRef = React.useRef(count);
  const frameRef = React.useRef<number>();

  const startAnimation = React.useCallback(() => {
    if (isStarted) return;
    setIsStarted(true);

    const startTime = performance.now() + delay;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Swift-to-gentle easing (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * end);
      setCount(currentValue);
      countRef.current = currentValue;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [end, duration, delay, isStarted]);

  React.useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return [count, startAnimation, isStarted] as const;
}

// Viewport intersection hook for lazy animation triggering
function useIntersectionTrigger(threshold: number = 0.3) {
  const [isInView, setIsInView] = React.useState(false);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasTriggered(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasTriggered]);

  return [ref, isInView, hasTriggered] as const;
}

// Enhanced animated counter component
function AnimatedStatCard({ stat, index, shouldReduceMotion }: {
  stat: typeof STATS[0];
  index: number;
  shouldReduceMotion: boolean;
}) {
  const [triggerRef, isInView] = useIntersectionTrigger(0.3);
  const [count, startAnimation, hasStarted] = useAnimatedCounter(
    stat.numericValue,
    2500,
    index * 200 // Stagger each counter by 200ms
  );
  const [showPulse, setShowPulse] = React.useState(false);
  const IconComponent = stat.icon;

  // Start animation when in view
  React.useEffect(() => {
    if (isInView && !hasStarted) {
      startAnimation();
    }
  }, [isInView, startAnimation, hasStarted]);

  // Trigger pulse effect when counter reaches target
  React.useEffect(() => {
    if (count >= stat.numericValue && count > 0 && !shouldReduceMotion) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [count, stat.numericValue, shouldReduceMotion]);

  const displayValue = shouldReduceMotion ? stat.value : `${stat.prefix}${count}${stat.suffix}`;

  return (
    <motion.div
      ref={triggerRef}
      className="group relative"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      whileHover={{
        scale: shouldReduceMotion ? 1 : 1.02,
        y: shouldReduceMotion ? 0 : -5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      {/* Background card */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl p-8 transition-all duration-500",
        "bg-white/70 backdrop-blur-sm border border-gray-200/50",
        "group-hover:bg-white group-hover:border-indigo-200 group-hover:shadow-xl"
      )}>
        {/* Background gradient on hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
          stat.bgColor
        )} />

        {/* Icon */}
        <motion.div
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300",
            stat.bgColor,
            stat.color
          )}
          whileHover={{
            scale: shouldReduceMotion ? 1 : 1.1,
            rotate: shouldReduceMotion ? 0 : 5,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          <IconComponent className="w-8 h-8" />
        </motion.div>

        {/* Animated counter */}
        <motion.div
          className={cn(
            "text-4xl md:text-5xl font-bold mb-2 transition-all duration-300",
            stat.color,
            "group-hover:scale-105"
          )}
          animate={{
            scale: showPulse ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          {displayValue}
        </motion.div>

        {/* Label */}
        <div className="text-gray-700 font-semibold text-lg mb-2 group-hover:text-gray-900 transition-colors">
          {stat.label}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
          {stat.description}
        </p>

        {/* Decorative element */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={cn(
            "w-3 h-3 rounded-full",
            stat.color.replace('text-', 'bg-')
          )} />
        </div>
      </div>
    </motion.div>
  );
}

// Main track record section component
function TrackRecordSection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0.1 : 0.8 }}
    >
      {/* Background with enhanced gradients */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50/50 shadow-2xl" />
      <div className="absolute inset-0 rounded-3xl border border-white/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative p-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Track Record
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak for our commitment to excellence and customer satisfaction across Patna
          </p>
        </motion.div>

        {/* Animated statistics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <AnimatedStatCard
              key={stat.label}
              stat={stat}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: shouldReduceMotion ? 0.1 : 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-200/50">
            <Star className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-medium">Excellence in Every Service</span>
            <Star className="w-5 h-5 text-indigo-600" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced feature card with animations and hover cards
function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
    >
      <Card className={cn(
        "group relative overflow-hidden h-full transition-all duration-500",
        "border-2 border-gray-100 hover:border-indigo-200",
        "hover:shadow-2xl hover:-translate-y-1",
        "bg-white/80 backdrop-blur-sm hover:bg-white"
      )}>
        <CardContent className="p-8 relative">
          {/* Background gradient on hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500",
            `bg-gradient-to-br from-${feature.color.split('-')[1]}-50 to-transparent`
          )} />

          <div className="relative flex flex-col h-full">
            {/* Icon with enhanced hover animations */}
            <motion.div
              className={cn(
                "flex-shrink-0 rounded-xl p-4 mb-6 transition-all duration-300",
                feature.bgColor,
                feature.hoverColor,
                feature.color,
                "group-hover:scale-110 group-hover:rotate-3"
              )}
              whileHover={{
                scale: shouldReduceMotion ? 1 : 1.2,
                rotate: shouldReduceMotion ? 0 : 6,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <IconComponent className="h-8 w-8" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Badge with hover card for credentials */}
              {feature.badge && (
                <div className="mt-4">
                  <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "cursor-help px-3 py-1.5 font-medium transition-all duration-200",
                          "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
                          "border border-indigo-200 hover:border-indigo-300"
                        )}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {feature.badge.text}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80" side="top" align="center">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {feature.badge.hoverContent.title}
                          </h4>
                          <div className="space-y-2">
                            {feature.badge.hoverContent.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-gray-600 leading-relaxed">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <h5 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                            Credentials Include
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {feature.badge.hoverContent.credentials.map((credential, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium"
                              >
                                <CheckCircle className="w-3 h-3" />
                                {credential}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              )}
            </div>

            {/* Enhanced stat display */}
            <div className="text-center pt-4 border-t border-gray-100">
              <motion.div
                className={cn('text-3xl font-bold mb-1', feature.color)}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.stat}
              </motion.div>
              <div className="text-sm text-gray-500 font-medium">
                {feature.statLabel}
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Star className="w-5 h-5 text-indigo-400" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WhyChooseUs({ className }: WhyChooseUsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn('py-20 relative overflow-hidden', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Why Choose AC Service Patna?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
            Your trusted partner for all AC services in Patna with unmatched expertise,
            certified professionals, and guaranteed customer satisfaction
          </p>
        </motion.div>

        {/* Enhanced Features Grid with staggered animations */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Enhanced Track Record Counters with Animations */}
        <TrackRecordSection shouldReduceMotion={shouldReduceMotion} />

        {/* Enhanced Service Areas Preview */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Serving Major Areas in Patna
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {PATNA_SERVICE_AREAS.slice(0, 8).map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.3,
                  delay: shouldReduceMotion ? 0 : index * 0.05
                }}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium bg-white/60 hover:bg-white/90 transition-all duration-200 cursor-pointer hover:scale-105"
                >
                  {area.name}
                </Badge>
              </motion.div>
            ))}
            {PATNA_SERVICE_AREAS.length > 8 && (
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700">
                +{PATNA_SERVICE_AREAS.length - 8} more areas
              </Badge>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="font-medium">Same-day service available</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span className="font-medium">Emergency response within {EMERGENCY_RESPONSE.withinPatna}</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Quality Assurance Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: CheckCircle,
              title: 'Quality Guarantee',
              description: '100% satisfaction guarantee on all our services',
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              hoverColor: 'hover:bg-green-100'
            },
            {
              icon: DollarSign,
              title: 'Transparent Pricing',
              description: 'No hidden charges, upfront quotes for all services',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              hoverColor: 'hover:bg-blue-100'
            },
            {
              icon: MessageCircle,
              title: '24/7 Support',
              description: 'Round-the-clock customer support and emergency service',
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              hoverColor: 'hover:bg-purple-100'
            }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.1
                }}
                whileHover={{
                  y: shouldReduceMotion ? 0 : -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div
                  className={cn(
                    "inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6 transition-all duration-300",
                    item.bgColor,
                    item.hoverColor,
                    item.color
                  )}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.1,
                    rotate: shouldReduceMotion ? 0 : 5
                  }}
                >
                  <IconComponent className="h-8 w-8" />
                </motion.div>
                <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
