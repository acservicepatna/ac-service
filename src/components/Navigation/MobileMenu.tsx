'use client';

import * as React from 'react';
import Link from 'next/link';
import { SheetHeader, SheetTitle, SheetClose } from '@/components/ui/Sheet';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface MobileMenuProps {
  navigation: Array<{ name: string; href: string }>;
  currentPath: string;
  onBookingClick?: () => void;
  onClose?: () => void;
}

export default function MobileMenu({
  navigation,
  currentPath,
  onBookingClick,
  onClose,
}: MobileMenuProps) {
  const handlePhoneCall = () => {
    window.open('tel:+919835123456', '_self');
  };

  const handleEmergencyCall = () => {
    window.open('tel:+919835123456', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi, I need AC service in Patna. Please contact me.'
    );
    window.open(`https://wa.me/919835123456?text=${message}`, '_blank');
  };

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      <SheetHeader className="text-left border-b pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              className="w-6 h-6 text-primary-foreground"
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
          <div>
            <SheetTitle className="text-xl font-bold text-foreground">
              AC Servicing Pro
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Professional AC Services in Patna
            </p>
          </div>
        </div>
        <SheetClose data-sheet-close />
      </SheetHeader>

      {/* Emergency Section */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="animate-pulse">
            <svg
              className="w-5 h-5 text-destructive"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Badge variant="destructive" className="font-bold text-xs">
            24/7 EMERGENCY
          </Badge>
        </div>
        <p className="text-sm text-destructive font-semibold mb-3">
          AC Emergency? We're available 24/7!
        </p>
        <Button
          onClick={handleEmergencyCall}
          variant="destructive"
          size="sm"
          className="w-full mb-2"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Emergency Call
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navigation.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => {
                  // Close the sheet manually when clicking navigation
                  if (onClose) {
                    onClose();
                  }
                }}
                className={cn(
                  'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors w-full block',
                  currentPath === item.href
                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <span className="flex items-center w-full">
                  <span className="flex-1">{item.name}</span>
                  {currentPath === item.href && (
                    <svg
                      className="w-4 h-4 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contact Section */}
      <div className="border-t pt-6 mt-6">
        <div className="space-y-4">
          <Button 
            onClick={handleBookingClick}
            className="w-full"
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
                d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H6a1 1 0 00-1 1v9a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1h-2M8 7h8"
              />
            </svg>
            Book Service Now
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePhoneCall}
              className="flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm">Call</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span className="text-sm">WhatsApp</span>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="text-center pt-4">
            <p className="text-sm font-medium text-foreground">
              +91 98351 23456
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Serving all areas in Patna, Bihar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
