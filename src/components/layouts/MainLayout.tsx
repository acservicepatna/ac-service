'use client';

import * as React from 'react';
import { EmergencyBanner, Navbar, Breadcrumbs, MobileBookingDock } from '@/components/Navigation';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showEmergencyBanner?: boolean;
  showFooter?: boolean;
  onBookingClick?: () => void;
}

export default function MainLayout({
  children,
  showBreadcrumbs = true,
  showEmergencyBanner = true,
  showFooter = true,
  onBookingClick,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Emergency Banner */}
      {showEmergencyBanner && <EmergencyBanner />}

      {/* Main Navigation */}
      <Navbar onBookingClick={onBookingClick} />

      {/* Breadcrumbs */}
      {showBreadcrumbs && <Breadcrumbs />}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Mobile Booking Dock */}
      <MobileBookingDock onBookingClick={onBookingClick} />
    </div>
  );
}
