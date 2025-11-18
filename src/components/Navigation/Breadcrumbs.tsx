'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import { cn } from '@/utils/cn';

interface BreadcrumbsProps {
  className?: string;
  maxItems?: number;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Custom page labels for better UX
const pageLabels: Record<string, string> = {
  '': 'Home',
  services: 'Our Services',
  booking: 'Book Service',
  about: 'About Us',
  contact: 'Contact Us',
  'ac-repair': 'AC Repair',
  'ac-installation': 'AC Installation',
  'ac-maintenance': 'AC Maintenance',
  commercial: 'Commercial Services',
  residential: 'Residential Services',
};

export default function Breadcrumbs({
  className,
  maxItems = 4,
}: BreadcrumbsProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = React.useMemo(() => {
    // Skip breadcrumbs on home page
    if (pathname === '/') {
      return [];
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Get custom label or format the segment
      const label =
        pageLabels[segment] ||
        segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        current: isLast,
      });
    });

    // Truncate if too many items
    if (breadcrumbs.length > maxItems) {
      const first = breadcrumbs[0];
      const last = breadcrumbs[breadcrumbs.length - 1];
      const secondLast = breadcrumbs[breadcrumbs.length - 2];

      return [
        first,
        { label: '...', href: undefined },
        secondLast,
        last,
      ].filter(Boolean);
    }

    return breadcrumbs;
  }, [pathname, maxItems]);

  // Don't render if no breadcrumbs or only home
  if (generateBreadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className={cn('py-4 border-b bg-gray-50/50', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            {generateBreadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={`${breadcrumb.label}-${index}`}>
                <BreadcrumbItem>
                  {breadcrumb.current ? (
                    <BreadcrumbPage className="text-indigo-600 font-medium">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  ) : breadcrumb.label === '...' ? (
                    <span className="text-gray-500 font-medium">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <BreadcrumbLink
                      href={breadcrumb.href!}
                      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                    >
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {index < generateBreadcrumbs.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: generateBreadcrumbs
                .filter(item => !item.current && item.label !== '...')
                .map((item, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: item.label,
                  item: item.href
                    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://acservicingpro.com'}${item.href}`
                    : undefined,
                })),
            }),
          }}
        />
      </div>
    </div>
  );
}

// Hook for getting current page info
export function useCurrentPage() {
  const pathname = usePathname();

  return React.useMemo(() => {
    if (pathname === '/') {
      return {
        title: 'Home',
        description: 'Professional AC Services in Patna, Bihar',
      };
    }

    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    const title =
      pageLabels[lastSegment] ||
      lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const descriptions: Record<string, string> = {
      services:
        'Comprehensive AC services including repair, installation, and maintenance',
      booking: 'Book your AC service appointment online',
      about: 'Learn about our professional AC service team',
      contact: 'Get in touch with AC Service Patna',
      'ac-repair': 'Professional AC repair services in Patna',
      'ac-installation': 'Expert AC installation services',
      'ac-maintenance': 'Regular AC maintenance and servicing',
    };

    const description =
      descriptions[lastSegment] || `${title} - AC Service Patna`;

    return { title, description };
  }, [pathname]);
}
