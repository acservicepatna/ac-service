'use client';

import React, { useState, useMemo } from 'react';
import { SearchX, Loader2, RefreshCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import ServiceCard from './ServiceCard';
import ServicesFilter, { FilterOptions } from './ServicesFilter';
import { cn } from '@/lib/utils';
import type { Service, ServiceCategory, ACType } from '@/types';

interface ServicesGridProps {
  services: Service[];
  isLoading?: boolean;
  error?: string | null;
  className?: string;
  onRefresh?: () => void;
}

const AC_BRANDS = [
  'LG',
  'Samsung',
  'Daikin',
  'Voltas',
  'Hitachi',
  'Blue Star',
  'Godrej',
  'Carrier',
  'O General',
  'Whirlpool',
];

export default function ServicesGrid({
  services,
  isLoading = false,
  error = null,
  className,
  onRefresh,
}: ServicesGridProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: 'all',
    priceRange: [0, 20000],
    acTypes: [],
    brands: [],
    serviceType: 'all',
    sortBy: 'popular',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort services
  const filteredAndSortedServices = useMemo(() => {
    if (!services) return [];

    const filtered = services.filter(service => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(query);
        const matchesDescription = service.description
          .toLowerCase()
          .includes(query);
        const matchesFeatures = service.features.some(feature =>
          feature.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDescription && !matchesFeatures) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && service.category !== filters.category) {
        return false;
      }

      // Price range filter
      const serviceMinPrice = service.price.min;
      const serviceMaxPrice = service.price.max || service.price.min;
      if (
        serviceMinPrice > filters.priceRange[1] ||
        serviceMaxPrice < filters.priceRange[0]
      ) {
        return false;
      }

      // AC Types filter
      if (filters.acTypes.length > 0) {
        const hasCompatibleType = filters.acTypes.some(type =>
          service.availableFor.includes(type)
        );
        if (!hasCompatibleType) {
          return false;
        }
      }

      // Brands filter (simulated - in real app, this would be service-specific)
      if (filters.brands.length > 0) {
        // For demo purposes, we'll assume all services support all brands
        // In a real app, services would have specific brand compatibility
        // This filter is ready for when that data is available
      }

      // Service type filter
      if (filters.serviceType === 'emergency' && !service.isEmergency) {
        return false;
      }
      if (filters.serviceType === 'regular' && service.isEmergency) {
        return false;
      }

      return true;
    });

    // Sort services
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price_low':
        filtered.sort((a, b) => a.price.min - b.price.min);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price.min - a.price.min);
        break;
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'popular':
      default:
        // Keep original order for popular (could implement actual popularity sorting)
        break;
    }

    return filtered;
  }, [services, filters]);

  // Get featured services (for hero display)
  const featuredServices = useMemo(() => {
    const popularCategories: ServiceCategory[] = ['cleaning', 'repair'];
    return (
      services
        ?.filter(service => popularCategories.includes(service.category))
        .slice(0, 2) || []
    );
  }, [services]);

  if (error) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-12 text-center',
          className
        )}
      >
        <SearchX className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Unable to Load Services</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          We encountered an error while loading the services. Please try again.
        </p>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Featured Services Hero */}
      {!isLoading &&
        featuredServices.length > 0 &&
        filters.category === 'all' &&
        !filters.searchQuery && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Featured Services</h2>
              <p className="text-muted-foreground">
                Our most popular AC services in Patna
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        )}

      {/* Filters */}
      <ServicesFilter
        filters={filters}
        onFiltersChange={setFilters}
        totalResults={filteredAndSortedServices.length}
        availableBrands={AC_BRANDS}
      />

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {filters.category === 'all'
            ? 'All Services'
            : `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Services`}
        </h2>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">
            Loading services...
          </span>
        </div>
      )}

      {/* Services Grid */}
      {!isLoading && filteredAndSortedServices.length > 0 && (
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          )}
        >
          {filteredAndSortedServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              variant={viewMode === 'list' ? 'compact' : 'default'}
              className={viewMode === 'list' ? 'flex-row' : ''}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredAndSortedServices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <SearchX className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Services Found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            We couldn't find any services matching your criteria. Try adjusting
            your filters or search terms.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  searchQuery: '',
                  category: 'all',
                  priceRange: [0, 20000],
                  acTypes: [],
                  brands: [],
                  serviceType: 'all',
                  sortBy: 'popular',
                })
              }
            >
              Clear All Filters
            </Button>
            <Button variant="primary">View All Services</Button>
          </div>
        </div>
      )}

      {/* Load More (for pagination in future) */}
      {!isLoading && filteredAndSortedServices.length > 0 && (
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredAndSortedServices.length} of{' '}
            {services?.length || 0} services
          </p>
          {/* Placeholder for load more functionality */}
          {filteredAndSortedServices.length < (services?.length || 0) && (
            <Button variant="outline" disabled>
              Load More Services
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
