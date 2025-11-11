'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/Sheet';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
  onBookingClick?: () => void;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Booking', href: '/booking' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ className, onBookingClick }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneCall = () => {
    window.open('tel:+919835123456', '_self');
  };

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      // Fallback to booking page
      window.location.href = '/booking';
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b'
          : 'bg-white border-b',
        className
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">
                AC Servicing
              </span>
              <span className="text-sm text-indigo-600 block -mt-1">Pro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item, index) => (
                  <NavigationMenuItem key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'transition-all duration-200',
                          pathname === item.href
                            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm'
                            : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                        )}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Phone Number & CTA */}
          <div className="flex items-center space-x-4">
            {/* Phone Number - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePhoneCall}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-700 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50"
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </motion.svg>
                <span className="text-sm font-semibold">+91 98351 23456</span>
              </motion.button>
            </div>

            {/* Book Now Button - Enhanced with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={handleBookingClick}
                className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Now
              </Button>
            </motion.div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                  aria-label="Open mobile menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 max-w-[85vw]">
                <MobileMenu
                  navigation={navigation}
                  currentPath={pathname}
                  onBookingClick={handleBookingClick}
                  onClose={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
