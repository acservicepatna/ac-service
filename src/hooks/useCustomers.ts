/**
 * Customer-related React Query hooks
 * Custom hooks for fetching and managing customer data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCustomer,
  getCustomerById,
  getCustomerByPhone,
  getCustomers,
  updateCustomer,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
  updateCustomerLoyaltyPoints,
  getCustomerStats,
  searchCustomers,
  type CreateCustomerRequest,
  type UpdateCustomerRequest,
  type CustomerListParams,
  type CustomerFilters,
} from '@/services/customerService';
import {
  queryKeys,
  invalidateQueries,
  handleQueryError,
  handleMutationSuccess,
} from '@/lib/queryClient';
import type { Address } from '@/types';

/**
 * Hook to fetch customers with filtering and pagination
 */
export function useCustomers(params: CustomerListParams = {}) {
  return useQuery({
    queryKey: queryKeys.customers.list(params),
    queryFn: () => getCustomers(params),
    onError: handleQueryError,
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook to fetch a specific customer by ID
 */
export function useCustomer(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.customers.detail(id),
    queryFn: () => getCustomerById(id),
    enabled: enabled && !!id,
    onError: handleQueryError,
    // Customer details should be relatively fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch customer by phone number
 */
export function useCustomerByPhone(phone: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.customers.byPhone(phone),
    queryFn: () => getCustomerByPhone(phone),
    enabled: enabled && !!phone,
    onError: handleQueryError,
    // Phone lookups should be fresh
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch customer statistics
 */
export function useCustomerStats() {
  return useQuery({
    queryKey: queryKeys.customers.stats(),
    queryFn: getCustomerStats,
    onError: handleQueryError,
    // Stats can be cached longer
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Hook to search customers
 */
export function useCustomerSearch(
  query: string,
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.customers.search(query),
    queryFn: () => searchCustomers(query, limit),
    enabled: enabled && !!query.trim(),
    onError: handleQueryError,
    // Don't cache search results for too long
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Mutation hook to create a new customer
 */
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData: CreateCustomerRequest) =>
      createCustomer(customerData),
    onSuccess: data => {
      handleMutationSuccess(data, 'Customer creation');

      // Invalidate customer lists
      invalidateQueries.afterCustomer();

      // Add the new customer to the cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.customers.detail(data.data.id),
          data
        );

        // Also cache by phone number for quick lookups
        queryClient.setQueryData(
          queryKeys.customers.byPhone(data.data.phone),
          data
        );
      }
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to update customer information
 */
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updateData,
    }: {
      id: string;
      updateData: UpdateCustomerRequest;
    }) => updateCustomer(id, updateData),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Customer update');

      // Update the specific customer in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.customers.detail(variables.id),
          data
        );
      }

      // Invalidate customer lists
      invalidateQueries.afterCustomer();
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to add customer address
 */
export function useAddCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      address,
    }: {
      customerId: string;
      address: Omit<Address, 'id'>;
    }) => addCustomerAddress(customerId, address),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Address addition');

      // Update the customer in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.customers.detail(variables.customerId),
          data
        );
      }

      // Invalidate customer lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to update customer address
 */
export function useUpdateCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      addressId,
      addressUpdate,
    }: {
      customerId: string;
      addressId: string;
      addressUpdate: Partial<Omit<Address, 'id'>>;
    }) => updateCustomerAddress(customerId, addressId, addressUpdate),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Address update');

      // Update the customer in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.customers.detail(variables.customerId),
          data
        );
      }

      // Invalidate customer lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to delete customer address
 */
export function useDeleteCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      addressId,
    }: {
      customerId: string;
      addressId: string;
    }) => deleteCustomerAddress(customerId, addressId),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Address deletion');

      // Update the customer in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.customers.detail(variables.customerId),
          data
        );
      }

      // Invalidate customer lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to update customer loyalty points
 */
export function useUpdateCustomerLoyaltyPoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      pointsChange,
      reason,
    }: {
      customerId: string;
      pointsChange: number;
      reason: string;
    }) => updateCustomerLoyaltyPoints(customerId, pointsChange, reason),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Loyalty points update');

      // Update the customer in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.customers.detail(variables.customerId),
          data
        );
      }

      // Invalidate customer stats to reflect loyalty changes
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.stats(),
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Hook to prefetch customer details
 */
export function usePrefetchCustomer() {
  const queryClient = useQueryClient();

  return (customerId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.customers.detail(customerId),
      queryFn: () => getCustomerById(customerId),
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  };
}

/**
 * Hook to get customer with their booking history
 */
export function useCustomerWithBookings(
  customerId: string,
  enabled: boolean = true
) {
  const customerQuery = useCustomer(customerId, enabled);

  // Also prefetch customer's booking history
  const queryClient = useQueryClient();

  if (enabled && customerId && customerQuery.data?.data) {
    queryClient.prefetchQuery({
      queryKey: queryKeys.bookings.customer(customerId),
      queryFn: () =>
        import('@/services/bookingService').then(service =>
          service.getCustomerBookingHistory(customerId)
        ),
      staleTime: 1000 * 60 * 5,
    });
  }

  return customerQuery;
}

/**
 * Hook to check if customer exists by phone
 */
export function useCustomerExists(phone: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['customers', 'exists', phone],
    queryFn: async () => {
      const result = await getCustomerByPhone(phone);
      return !!result.data;
    },
    enabled: enabled && !!phone && phone.length >= 10,
    onError: handleQueryError,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}

/**
 * Hook for infinite scrolling customers
 */
export function useInfiniteCustomers(filters: CustomerFilters = {}) {
  return useQuery({
    queryKey: queryKeys.customers.list({ filters, limit: 20 }),
    queryFn: () => getCustomers({ filters, limit: 20, page: 1 }),
    onError: handleQueryError,
    // Enable infinite loading by implementing getNextPageParam if needed
  });
}
