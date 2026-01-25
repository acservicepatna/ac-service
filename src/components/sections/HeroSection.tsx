'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { CONTACT_INFO, PATNA_SERVICE_AREAS, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 to-blue-50',
        className
      )}
    >
      {/* Animated Background Gradient Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(600px circle at 20% 30%, rgb(120, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(600px circle at 80% 20%, rgb(120, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(600px circle at 40% 70%, rgb(120, 119, 198, 0.3), transparent 50%)',
            'radial-gradient(600px circle at 20% 30%, rgb(120, 119, 198, 0.3), transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Secondary Moving Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(800px circle at 70% 60%, rgb(79, 70, 229, 0.2), transparent 50%)',
            'radial-gradient(800px circle at 30% 40%, rgb(79, 70, 229, 0.2), transparent 50%)',
            'radial-gradient(800px circle at 60% 80%, rgb(79, 70, 229, 0.2), transparent 50%)',
            'radial-gradient(800px circle at 70% 60%, rgb(79, 70, 229, 0.2), transparent 50%)',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content Column */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Main Headline with Animation */}
            <motion.h1
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Professional{' '}
              </motion.span>
              <motion.span
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                AC Servicing
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                in Patna, Bihar
              </motion.span>
            </motion.h1>

            {/* Subheadline with Animation */}
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:text-xl lg:leading-9"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Expert air conditioning maintenance, repair, and installation
              services across Patna. Serving{' '}
              <motion.span
                className="font-semibold text-indigo-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {PATNA_SERVICE_AREAS.slice(0, 4)
                  .map(area => area.name)
                  .join(', ')}
              </motion.span>
              , and all major areas with certified technicians and 24/7 emergency
              support.
            </motion.p>

            {/* Trust Indicators with Animation */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {[
                { text: "10+ Years Experience", delay: 1.6 },
                { text: "Certified Technicians", delay: 1.8 },
                { text: "5000+ Happy Customers", delay: 2.0 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                >
                  <motion.svg
                    className="h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Call-to-Action Buttons with Animation */}
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link href={ROUTES.BOOKING}>
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Schedule Service
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-base font-semibold"
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
              </motion.div>
            </motion.div>

            {/* Emergency Contact with Animation */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
            >
              <p className="text-sm text-gray-600">
                Emergency Service Available 24/7:{' '}
                <Link
                  href={`tel:${CONTACT_INFO.phone.emergency}`}
                  className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  {CONTACT_INFO.phone.emergency}
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Hero Image Column */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          >
            {/* Floating Elements Around Image */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-100 rounded-full blur-xl opacity-70"
              animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-50"
              animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Hero Image */}
            <div className="relative z-10">
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/hero-section.webp"
                  alt="Professional AC technician servicing air conditioning unit in Patna"
                  width={1280}
                  height={800}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAMABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUHBv/EACEQAAIBAwMFAAAAAAAAAAAAAAABAgMEBRIUMhUhIkJS/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwEC/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECEiED/9oADAMBAAIRAxEAPwCo5PPQcX5IQzzcHPkjA3uQuGu8xdva+rmHB4a6R0qPWIP2QEy31f6AtmHRH//Z"
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                {/* Floating badge */}
                <motion.div
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    24/7 Available
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
