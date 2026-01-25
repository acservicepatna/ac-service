/**
 * React Query Configuration
 * Configures QueryClient with default options for the AC servicing application
 */

import { QueryClient } from '@tanstack/react-query';

// Create a query client with custom configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 1000 * 60 * 5,

      // Keep unused data in cache for 10 minutes
      gcTime: 1000 * 60 * 10,

      // Retry failed requests 2 times with exponential backoff
      retry: (failureCount, error: any) => {
        // Don't retry on 404s
        if (error?.status === 404) return false;
        // Don't retry more than 2 times
        if (failureCount >= 2) return false;
        return true;
      },

      // Retry delay with exponential backoff
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus only in production
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,

      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// Query Keys Factory
export const queryKeys = {
  // Services
  services: {
    all: ['services'] as const,
    list: (params?: any) => ['services', 'list', params] as const,
    detail: (id: string) => ['services', 'detail', id] as const,
    categories: () => ['services', 'categories'] as const,
    emergency: () => ['services', 'emergency'] as const,
    byCategory: (category: string) =>
      ['services', 'category', category] as const,
    search: (query: string) => ['services', 'search', query] as const,
    pricing: (serviceId: string, params?: any) =>
      ['services', 'pricing', serviceId, params] as const,
    recommended: (params: any) => ['services', 'recommended', params] as const,
  },

  // Bookings
  bookings: {
    all: ['bookings'] as const,
    list: (params?: any) => ['bookings', 'list', params] as const,
    detail: (id: string) => ['bookings', 'detail', id] as const,
    availability: (params: any) =>
      ['bookings', 'availability', params] as const,
    customer: (customerId: string) =>
      ['bookings', 'customer', customerId] as const,
    customerUpcoming: (customerId: string) =>
      ['bookings', 'customer', customerId, 'upcoming'] as const,
    customerHistory: (customerId: string) =>
      ['bookings', 'customer', customerId, 'history'] as const,
    technicianSchedule: (technicianId: string, date: string) =>
      ['bookings', 'technician', technicianId, date] as const,
    stats: (params?: any) => ['bookings', 'stats', params] as const,
  },

  // Customers
  customers: {
    all: ['customers'] as const,
    list: (params?: any) => ['customers', 'list', params] as const,
    detail: (id: string) => ['customers', 'detail', id] as const,
    byPhone: (phone: string) => ['customers', 'phone', phone] as const,
    stats: () => ['customers', 'stats'] as const,
    search: (query: string) => ['customers', 'search', query] as const,
  },

  // Technicians
  technicians: {
    all: ['technicians'] as const,
    list: (params?: any) => ['technicians', 'list', params] as const,
    detail: (id: string) => ['technicians', 'detail', id] as const,
    available: (params: any) => ['technicians', 'available', params] as const,
    emergency: (area: string) => ['technicians', 'emergency', area] as const,
    availability: (id: string, params: any) =>
      ['technicians', 'availability', id, params] as const,
    schedule: (id: string, date: string) =>
      ['technicians', 'schedule', id, date] as const,
    bySpecialization: (specialization: string) =>
      ['technicians', 'specialization', specialization] as const,
    stats: () => ['technicians', 'stats'] as const,
  },

  // Team Members
  team: {
    all: ['team'] as const,
    detail: (id: string) => ['team', 'detail', id] as const,
  },

  // Testimonials
  testimonials: {
    all: ['testimonials'] as const,
    list: (params?: any) => ['testimonials', 'list', params] as const,
    detail: (id: string) => ['testimonials', 'detail', id] as const,
    featured: (limit?: number) => ['testimonials', 'featured', limit] as const,
    byService: (service: string, limit?: number) =>
      ['testimonials', 'service', service, limit] as const,
    byArea: (area: string, limit?: number) =>
      ['testimonials', 'area', area, limit] as const,
    recent: (limit?: number) => ['testimonials', 'recent', limit] as const,
    highRating: (limit?: number) =>
      ['testimonials', 'highRating', limit] as const,
    stats: () => ['testimonials', 'stats'] as const,
    search: (query: string) => ['testimonials', 'search', query] as const,
  },
} as const;

// Invalidation helpers
export const invalidateQueries = {
  services: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.services.all }),
  bookings: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all }),
  customers: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.customers.all }),
  technicians: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.technicians.all }),
  team: () => queryClient.invalidateQueries({ queryKey: queryKeys.team.all }),
  testimonials: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all }),

  // Invalidate related queries after booking operations
  afterBooking: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.technicians.all });
  },

  // Invalidate related queries after customer operations
  afterCustomer: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
  },

  // Invalidate related queries after testimonial operations
  afterTestimonial: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all });
  },
};

// Error handling
export const handleQueryError = (error: any) => {
  console.error('Query Error:', error);

  // You can add global error handling here
  // For example, showing toast notifications, logging to external service, etc.

  return error;
};

// Success handling
export const handleMutationSuccess = (data: any, operation: string) => {
  console.log(`${operation} successful:`, data);

  // You can add global success handling here
  // For example, showing toast notifications, analytics tracking, etc.

  return data;
};
