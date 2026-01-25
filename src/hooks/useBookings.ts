/**
 * Booking-related React Query hooks
 * Custom hooks for fetching and managing booking/appointment data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createBooking,
  getBookingById,
  getBookings,
  updateBookingStatus,
  cancelBooking,
  rescheduleBooking,
  checkAvailability,
  getCustomerUpcomingBookings,
  getCustomerBookingHistory,
  getTechnicianSchedule,
  getBookingStats,
  type BookingListParams,
  type AvailabilityRequest,
  type BookingFilters,
} from '@/services/bookingService';
import {
  queryKeys,
  invalidateQueries,
  handleQueryError,
  handleMutationSuccess,
} from '@/lib/queryClient';
import type { BookingRequest, AppointmentStatus, TimeSlot } from '@/types';

/**
 * Hook to fetch bookings with filtering and pagination
 */
export function useBookings(params: BookingListParams = {}) {
  return useQuery({
    queryKey: queryKeys.bookings.list(params),
    queryFn: () => getBookings(params),
    onError: handleQueryError,
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook to fetch a specific booking by ID
 */
export function useBooking(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.bookings.detail(id),
    queryFn: () => getBookingById(id),
    enabled: enabled && !!id,
    onError: handleQueryError,
    // Booking details should be relatively fresh
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to check availability for booking
 */
export function useAvailabilityCheck(
  request: AvailabilityRequest,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.bookings.availability(request),
    queryFn: () => checkAvailability(request),
    enabled: enabled && !!request.date && !!request.serviceArea,
    onError: handleQueryError,
    // Availability changes frequently
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch customer's upcoming bookings
 */
export function useCustomerUpcomingBookings(
  customerId: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.bookings.customerUpcoming(customerId),
    queryFn: () => getCustomerUpcomingBookings(customerId),
    enabled: enabled && !!customerId,
    onError: handleQueryError,
    // Upcoming bookings should be fresh
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch customer's booking history
 */
export function useCustomerBookingHistory(
  customerId: string,
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.bookings.customerHistory(customerId),
    queryFn: () => getCustomerBookingHistory(customerId, limit),
    enabled: enabled && !!customerId,
    onError: handleQueryError,
    // History doesn't change often
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to fetch technician's schedule for booking purposes
 */
export function useTechnicianBookingSchedule(
  technicianId: string,
  date: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.bookings.technicianSchedule(technicianId, date),
    queryFn: () => getTechnicianSchedule(technicianId, date),
    enabled: enabled && !!technicianId && !!date,
    onError: handleQueryError,
    // Schedule should be relatively fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch booking statistics
 */
export function useBookingStats(dateFrom?: string, dateTo?: string) {
  return useQuery({
    queryKey: queryKeys.bookings.stats({ dateFrom, dateTo }),
    queryFn: () => getBookingStats(dateFrom, dateTo),
    onError: handleQueryError,
    // Stats can be cached longer
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Mutation hook to create a new booking
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: BookingRequest) => createBooking(bookingData),
    onSuccess: data => {
      handleMutationSuccess(data, 'Booking creation');

      // Invalidate related queries
      invalidateQueries.afterBooking();

      // Invalidate availability for the booked date and area
      if (data.data) {
        queryClient.invalidateQueries({
          queryKey: ['bookings', 'availability'],
          exact: false,
        });
      }
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to update booking status
 */
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      notes,
    }: {
      id: string;
      status: AppointmentStatus;
      notes?: string;
    }) => updateBookingStatus(id, status, notes),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Booking status update');

      // Update the specific booking in cache
      if (data.data) {
        queryClient.setQueryData(queryKeys.bookings.detail(variables.id), data);
      }

      // Invalidate related queries
      invalidateQueries.afterBooking();
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to cancel a booking
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      cancelBooking(id, reason),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Booking cancellation');

      // Update the specific booking in cache
      if (data.data) {
        queryClient.setQueryData(queryKeys.bookings.detail(variables.id), data);
      }

      // Invalidate related queries
      invalidateQueries.afterBooking();

      // Invalidate availability to free up the slot
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'availability'],
        exact: false,
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to reschedule a booking
 */
export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      newDate,
      newTimeSlot,
      reason,
    }: {
      id: string;
      newDate: string;
      newTimeSlot: TimeSlot;
      reason?: string;
    }) => rescheduleBooking(id, newDate, newTimeSlot, reason),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Booking rescheduling');

      // Update the specific booking in cache
      if (data.data) {
        queryClient.setQueryData(queryKeys.bookings.detail(variables.id), data);
      }

      // Invalidate related queries
      invalidateQueries.afterBooking();

      // Invalidate availability for both old and new dates
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'availability'],
        exact: false,
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Hook to prefetch booking details
 */
export function usePrefetchBooking() {
  const queryClient = useQueryClient();

  return (bookingId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.bookings.detail(bookingId),
      queryFn: () => getBookingById(bookingId),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };
}

/**
 * Hook to get bookings by filters with real-time updates
 */
export function useRealtimeBookings(filters: BookingFilters = {}) {
  return useQuery({
    queryKey: queryKeys.bookings.list({ filters }),
    queryFn: () => getBookings({ filters }),
    onError: handleQueryError,
    // Shorter stale time for real-time feel
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}

/**
 * Hook to check if a time slot is available
 */
export function useTimeSlotAvailability(
  date: string,
  timeSlot: string,
  serviceArea: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['bookings', 'timeslot', date, timeSlot, serviceArea],
    queryFn: () => checkAvailability({ date, serviceArea }),
    enabled: enabled && !!date && !!timeSlot && !!serviceArea,
    select: data => {
      // Extract specific time slot availability from the response
      const slot = data.data?.timeSlots.find(
        slot => slot.label.toLowerCase() === timeSlot.toLowerCase()
      );
      return slot?.available || false;
    },
    onError: handleQueryError,
    staleTime: 1000 * 60, // 1 minute
  });
}
