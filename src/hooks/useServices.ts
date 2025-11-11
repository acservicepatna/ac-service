/**
 * Service-related React Query hooks
 * Custom hooks for fetching and managing service data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getServices,
  getServiceById,
  getServicesByCategory,
  getEmergencyServices,
  getServiceCategories,
  getServicesForACType,
  searchServices,
  getServicePricingEstimate,
  getRecommendedServices,
  type ServiceFilters,
  type ServiceListParams,
} from '@/services/serviceService';
import {
  queryKeys,
  handleQueryError,
  handleMutationSuccess,
} from '@/lib/queryClient';
import type { ServiceCategory } from '@/types';

/**
 * Hook to fetch services with filtering and pagination
 */
export function useServices(params: ServiceListParams = {}) {
  return useQuery({
    queryKey: queryKeys.services.list(params),
    queryFn: () => getServices(params),
    // Prefetch next page for better UX
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook to fetch a specific service by ID
 */
export function useService(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.services.detail(id),
    queryFn: () => getServiceById(id),
    enabled: enabled && !!id,
    // Cache service details for longer since they don't change often
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Hook to fetch services by category
 */
export function useServicesByCategory(
  category: ServiceCategory,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.services.byCategory(category),
    queryFn: () => getServicesByCategory(category),
    enabled: enabled && !!category,
  });
}

/**
 * Hook to fetch emergency services
 */
export function useEmergencyServices() {
  return useQuery({
    queryKey: queryKeys.services.emergency(),
    queryFn: getEmergencyServices,
    // Emergency services should be fresh
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch service categories with counts
 */
export function useServiceCategories() {
  return useQuery({
    queryKey: queryKeys.services.categories(),
    queryFn: getServiceCategories,
    // Categories don't change often
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to fetch services compatible with specific AC type
 */
export function useServicesForACType(acType: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.services.byCategory(acType),
    queryFn: () => getServicesForACType(acType),
    enabled: enabled && !!acType,
  });
}

/**
 * Hook to search services
 */
export function useServiceSearch(
  query: string,
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.services.search(query),
    queryFn: () => searchServices(query, limit),
    enabled: enabled && !!query.trim(),
    // Don't cache search results for too long
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to get service pricing estimate
 */
export function useServicePricing(
  serviceId: string,
  acType?: string,
  area?: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.services.pricing(serviceId, { acType, area }),
    queryFn: () => getServicePricingEstimate(serviceId, acType, area),
    enabled: enabled && !!serviceId,
    // Pricing can change, so don't cache too long
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to get recommended services
 */
export function useRecommendedServices(
  acBrand: string,
  acType: string,
  acAge: number,
  enabled: boolean = true
) {
  const params = { acBrand, acType, acAge };

  return useQuery({
    queryKey: queryKeys.services.recommended(params),
    queryFn: () => getRecommendedServices(acBrand, acType, acAge),
    enabled: enabled && !!acBrand && !!acType && acAge >= 0,
  });
}

/**
 * Hook for infinite scrolling services
 */
export function useInfiniteServices(filters: ServiceFilters = {}) {
  return useQuery({
    queryKey: queryKeys.services.list({ filters, limit: 20 }),
    queryFn: () => getServices({ filters, limit: 20, page: 1 }),
    // Enable infinite loading by implementing getNextPageParam if needed
  });
}

/**
 * Hook to prefetch service details
 */
export function usePrefetchService() {
  const queryClient = useQueryClient();

  return (serviceId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.services.detail(serviceId),
      queryFn: () => getServiceById(serviceId),
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  };
}

/**
 * Hook to get multiple services by IDs
 */
export function useMultipleServices(serviceIds: string[]) {
  return useQuery({
    queryKey: ['services', 'multiple', serviceIds],
    queryFn: async () => {
      const promises = serviceIds.map(id => getServiceById(id));
      const results = await Promise.all(promises);
      return results.map(result => result.data).filter(Boolean);
    },
    enabled: serviceIds.length > 0,
  });
}
