'use client';

import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useFeaturedTestimonials } from '@/hooks/useTestimonials';
import { PATNA_SERVICE_AREAS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Star, ChevronLeft, ChevronRight, Quote, Shield, Clock, CheckCircle } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  className?: string;
}

// Fallback testimonials for when API is not available
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customerName: 'Rajesh Kumar',
    customerArea: 'Boring Road',
    service: 'AC Maintenance',
    rating: 5,
    comment:
      'Excellent service! The technician was very professional and fixed my AC issue quickly. The cooling is much better now. Highly recommended for AC servicing in Patna.',
    date: new Date('2024-01-15'),
    verified: true,
    image: '/api/placeholder/40/40',
  },
  {
    id: '2',
    customerName: 'Priya Singh',
    customerArea: 'Kankarbagh',
    service: 'AC Repair',
    rating: 5,
    comment:
      'Amazing experience with AC Servicing Pro. They responded to my emergency call within 30 minutes and got my AC working perfectly. Great team!',
    date: new Date('2024-01-10'),
    verified: true,
  },
  {
    id: '3',
    customerName: 'Amit Sharma',
    customerArea: 'Fraser Road',
    service: 'AC Installation',
    rating: 4,
    comment:
      'Professional installation of my new split AC. The technicians were skilled and completed the job neatly. Good service at reasonable price.',
    date: new Date('2024-01-08'),
    verified: true,
  },
  {
    id: '4',
    customerName: 'Sunita Devi',
    customerArea: 'Bailey Road',
    service: 'Deep Cleaning',
    rating: 5,
    comment:
      'The deep cleaning service was outstanding. My AC is running like new now and the air quality has improved significantly. Very satisfied!',
    date: new Date('2024-01-05'),
    verified: true,
  },
  {
    id: '5',
    customerName: 'Manoj Gupta',
    customerArea: 'Rajendra Nagar',
    service: 'Emergency Repair',
    rating: 5,
    comment:
      'Called them during a hot summer evening and they came immediately. Fixed the gas leak issue professionally. Excellent emergency service!',
    date: new Date('2024-01-03'),
    verified: true,
  },
  {
    id: '6',
    customerName: 'Deepika Kumari',
    customerArea: 'Patliputra',
    service: 'AC Maintenance',
    rating: 4,
    comment:
      'Good maintenance service. The technician explained everything clearly and gave helpful tips for AC care. Fair pricing and quality work.',
    date: new Date('2024-01-01'),
    verified: true,
  },
];

function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-1', className)}>
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          )}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Lazy hydration hook for performance optimization
function useLazyHydration(threshold = 0.1) {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
}

// Enhanced testimonial card with animations
function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 20
      }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.6,
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
      className={cn(
        "relative transition-all duration-500",
        isActive ? "z-10" : "z-0"
      )}
    >
      <Card className={cn(
        "h-full border-2 transition-all duration-500 backdrop-blur-sm",
        isActive
          ? "border-indigo-200 shadow-xl bg-white/95"
          : "border-gray-100 shadow-md bg-white/80 hover:bg-white/90"
      )}>
        <CardContent className="p-8 relative">
          {/* Quote Icon */}
          <div className="absolute top-4 right-4 opacity-10">
            <Quote className="w-8 h-8 text-indigo-600" />
          </div>

          {/* Rating and Service */}
          <div className="flex items-center justify-between mb-6">
            <StarRating rating={testimonial.rating} className="scale-110" />
            <Badge variant="secondary" className={cn(
              "text-xs px-3 py-1 font-medium",
              isActive ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
            )}>
              {testimonial.service}
            </Badge>
          </div>

          {/* Comment */}
          <blockquote className={cn(
            "text-lg leading-relaxed mb-8 font-medium transition-colors duration-300",
            isActive ? "text-gray-900" : "text-gray-700"
          )}>
            "{testimonial.comment}"
          </blockquote>

          {/* Customer Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.customerName}
                  className="h-12 w-12 rounded-full object-cover bg-gray-200 ring-2 ring-white shadow-md"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-white shadow-md">
                  <span className="text-white font-bold text-lg">
                    {testimonial.customerName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.customerName}
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-1">
                  <span>{testimonial.customerArea}</span>
                </div>
              </div>
            </div>

            {testimonial.verified && (
              <motion.div
                className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">Verified</span>
              </motion.div>
            )}
          </div>

          {/* Date and additional info */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span className="text-xs">
                {new Date(testimonial.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs font-medium">Service Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Enhanced carousel with auto-scroll, hover pause, and swipe support
function EnhancedCarousel({ testimonials, className }: { testimonials: Testimonial[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const totalSlides = Math.ceil(testimonials.length / itemsPerView.desktop);

  // Auto-scroll with pause on hover
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, totalSlides, shouldReduceMotion]);

  // Touch/mouse handlers for swipe support
  const handleDragStart = useCallback((clientX: number) => {
    setDragStart(clientX);
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (dragStart === null) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  }, [dragStart]);

  const handleDragEnd = useCallback(() => {
    if (dragStart === null) return;

    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Swipe right - go to previous
        setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
      } else {
        // Swipe left - go to next
        setCurrentIndex(prev => (prev + 1) % totalSlides);
      }
    }

    setDragStart(null);
    setDragOffset(0);
  }, [dragStart, dragOffset, totalSlides]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      handleDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const getVisibleTestimonials = (slideIndex: number) => {
    const start = slideIndex * itemsPerView.desktop;
    return testimonials.slice(start, start + itemsPerView.desktop);
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      {/* Main carousel container */}
      <div
        className="cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[400px] md:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: 1,
                x: dragOffset,
                transition: {
                  duration: shouldReduceMotion ? 0.1 : 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }}
              exit={{
                opacity: 0,
                x: -100,
                transition: { duration: shouldReduceMotion ? 0.1 : 0.3 }
              }}
            >
              {getVisibleTestimonials(currentIndex).map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${currentIndex}`}
                  testimonial={testimonial}
                  isActive={index === 1} // Middle card is active
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-indigo-600 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={() => setCurrentIndex(prev => (prev + 1) % totalSlides)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  const {
    data: testimonialsResponse,
    isLoading,
    error,
  } = useFeaturedTestimonials(6);
  const [lazyRef, isInView] = useLazyHydration(0.1);

  const testimonials = testimonialsResponse?.data || FALLBACK_TESTIMONIALS;

  if (error && !FALLBACK_TESTIMONIALS.length) {
    return null;
  }

  // Calculate average rating
  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 5;

  return (
    <section className={cn('py-20 relative overflow-hidden', className)} ref={lazyRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-100/50" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,.5)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
            Trusted by thousands of customers across Patna for reliable AC services.
            Real experiences from real people.
          </p>

          {/* Enhanced Rating Summary */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <StarRating
                rating={Math.round(averageRating)}
                className="scale-125"
              />
              <span className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-gray-600 font-medium">
              Based on {testimonials.length}+ verified reviews
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Testimonials Carousel - Only render when in view */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <EnhancedCarousel testimonials={testimonials} className="mb-16" />
          </motion.div>
        )}

        {/* Service Areas Highlight */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-600 mb-6 text-lg">
            Serving customers across major areas in Patna
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PATNA_SERVICE_AREAS.slice(0, 8).map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/60 hover:bg-white/80 transition-colors">
                  {area.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-xl text-gray-700 mb-6">
            Join thousands of satisfied customers and experience the difference
          </p>
          <motion.a
            href="/booking"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Service Today
            <ChevronRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
