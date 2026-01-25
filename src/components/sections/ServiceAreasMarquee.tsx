'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { PATNA_SERVICE_AREAS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ServiceArea {
  name: string;
  pincode: string;
  landmarks: string[];
  eta?: string;
  availability?: string;
  status?: 'available' | 'busy' | 'next-slot';
}

interface ServiceAreasMarqueeProps {
  className?: string;
  speed?: number;
}

// Enhanced service areas with mock ETA and availability data
const enhancedServiceAreas: ServiceArea[] = PATNA_SERVICE_AREAS.map((area, index) => ({
  ...area,
  eta: ['15 mins', '25 mins', '30 mins', '45 mins', '1 hour'][index % 5],
  availability: [
    'Available now',
    'Next slot: 2:30 PM',
    'Available now',
    'Next slot: 4:00 PM',
    'Available now',
    'Next slot: Tomorrow 9 AM',
    'Available now',
    'Next slot: 6:30 PM',
    'Available now',
    'Next slot: Tomorrow 11 AM'
  ][index],
  status: (['available', 'next-slot', 'available', 'busy', 'available'] as const)[index % 5]
}));

function ServiceAreaCard({ area }: { area: ServiceArea; index: number }) {
  const statusConfig = {
    available: {
      color: 'bg-green-500',
      text: 'Available Now',
      textColor: 'text-green-700'
    },
    busy: {
      color: 'bg-yellow-500',
      text: 'Busy',
      textColor: 'text-yellow-700'
    },
    'next-slot': {
      color: 'bg-blue-500',
      text: 'Next Slot',
      textColor: 'text-blue-700'
    }
  };

  const config = statusConfig[area.status || 'available'];

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <motion.div
          className={cn(
            'relative flex-shrink-0 cursor-pointer group',
            'bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50',
            'hover:bg-white hover:shadow-lg transition-all duration-300',
            'min-w-[220px] max-w-[220px] mx-2'
          )}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Status Indicator */}
          <div className="absolute top-3 right-3">
            <div className={cn("w-3 h-3 rounded-full", config.color)} />
          </div>

          {/* Area Name */}
          <div className="mb-2">
            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">
              {area.name}
            </h4>
            <p className="text-xs text-gray-500">{area.pincode}</p>
          </div>

          {/* Quick Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">ETA: {area.eta}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className={cn("w-3 h-3", config.textColor)} />
              <span className={cn("text-xs font-medium", config.textColor)}>
                {config.text}
              </span>
            </div>
          </div>
        </motion.div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80" side="top" align="center">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{area.name}</h4>
              <p className="text-sm text-gray-500">Pincode: {area.pincode}</p>
            </div>
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium",
              area.status === 'available' ? 'bg-green-100 text-green-700' :
              area.status === 'busy' ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'
            )}>
              {config.text}
            </div>
          </div>

          {/* Availability Info */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">ETA Today</span>
              </div>
              <p className="text-lg font-semibold text-indigo-700">{area.eta}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Availability</span>
              </div>
              <p className="text-sm font-semibold text-green-700">{area.availability}</p>
            </div>
          </div>

          {/* Landmarks */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Key Landmarks</span>
            </div>
            <div className="space-y-1">
              {area.landmarks.slice(0, 3).map((landmark, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                  <span className="text-sm text-gray-600">{landmark}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action */}
          <button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Book Service in {area.name}
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function ServiceAreasMarquee({ className, speed = 30 }: ServiceAreasMarqueeProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Duplicate areas for seamless scrolling
  const duplicatedAreas = [...enhancedServiceAreas, ...enhancedServiceAreas];

  return (
    <section className={cn('relative overflow-hidden py-12 bg-gradient-to-r from-gray-50 to-blue-50', className)}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Service Coverage Across Patna
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional AC services available in all major areas. Hover over any location to see real-time availability and estimated arrival times.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Content */}
        <motion.div
          className="flex"
          animate={{
            x: isHovered ? 0 : `-${(enhancedServiceAreas.length * 244)}px`
          }}
          transition={{
            duration: isHovered ? 0.5 : speed,
            ease: isHovered ? "easeOut" : "linear",
            repeat: isHovered ? 0 : Infinity,
          }}
          style={{
            width: `${duplicatedAreas.length * 244}px`
          }}
        >
          {duplicatedAreas.map((area, index) => (
            <ServiceAreaCard
              key={`${area.name}-${index}`}
              area={area}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-sm text-gray-600 mb-4">
          Don&apos;t see your area? We&apos;re expanding coverage daily.
        </p>
        <motion.button
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="w-4 h-4" />
          View All Service Areas
        </motion.button>
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
      </div>
    </section>
  );
}