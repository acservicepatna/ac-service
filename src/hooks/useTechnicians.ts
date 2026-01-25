/**
 * Technician-related React Query hooks
 * Custom hooks for fetching and managing technician data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTechnicians,
  getTechnicianById,
  getAvailableTechnicians,
  getEmergencyTechnicians,
  checkTechnicianAvailability,
  getTechnicianSchedule,
  getTeamMembers,
  getTeamMemberById,
  getTechniciansBySpecialization,
  getTechnicianStats,
  updateTechnicianAvailability,
  type TechnicianListParams,
  type TechnicianFilters,
  type TechnicianAvailabilityRequest,
} from '@/services/teamService';
import {
  queryKeys,
  handleQueryError,
  handleMutationSuccess,
} from '@/lib/queryClient';
import type { ServiceCategory } from '@/types';

/**
 * Hook to fetch technicians with filtering and pagination
 */
export function useTechnicians(params: TechnicianListParams = {}) {
  return useQuery({
    queryKey: queryKeys.technicians.list(params),
    queryFn: () => getTechnicians(params),
    onError: handleQueryError,
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook to fetch a specific technician by ID
 */
export function useTechnician(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.technicians.detail(id),
    queryFn: () => getTechnicianById(id),
    enabled: enabled && !!id,
    onError: handleQueryError,
    // Technician details should be relatively fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch available technicians for a service and area
 */
export function useAvailableTechnicians(
  serviceCategory: ServiceCategory,
  area: string,
  date: string,
  timeSlot: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.technicians.available({
      serviceCategory,
      area,
      date,
      timeSlot,
    }),
    queryFn: () =>
      getAvailableTechnicians(serviceCategory, area, date, timeSlot),
    enabled: enabled && !!serviceCategory && !!area && !!date && !!timeSlot,
    onError: handleQueryError,
    // Availability changes frequently
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch emergency technicians for an area
 */
export function useEmergencyTechnicians(area: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.technicians.emergency(area),
    queryFn: () => getEmergencyTechnicians(area),
    enabled: enabled && !!area,
    onError: handleQueryError,
    // Emergency availability should be fresh
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}

/**
 * Hook to check technician availability
 */
export function useTechnicianAvailability(
  technicianId: string,
  request: TechnicianAvailabilityRequest,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.technicians.availability(technicianId, request),
    queryFn: () => checkTechnicianAvailability(technicianId, request),
    enabled: enabled && !!technicianId && !!request.date && !!request.timeSlot,
    onError: handleQueryError,
    // Availability changes frequently
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}

/**
 * Hook to fetch technician's schedule for a specific date
 */
export function useTechnicianSchedule(
  technicianId: string,
  date: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.technicians.schedule(technicianId, date),
    queryFn: () => getTechnicianSchedule(technicianId, date),
    enabled: enabled && !!technicianId && !!date,
    onError: handleQueryError,
    // Schedule should be relatively fresh
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
}

/**
 * Hook to fetch technicians by specialization
 */
export function useTechniciansBySpecialization(
  specialization: ServiceCategory,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.technicians.bySpecialization(specialization),
    queryFn: () => getTechniciansBySpecialization(specialization),
    enabled: enabled && !!specialization,
    onError: handleQueryError,
  });
}

/**
 * Hook to fetch technician statistics
 */
export function useTechnicianStats() {
  return useQuery({
    queryKey: queryKeys.technicians.stats(),
    queryFn: getTechnicianStats,
    onError: handleQueryError,
    // Stats can be cached longer
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Hook to fetch all team members
 */
export function useTeamMembers() {
  return useQuery({
    queryKey: queryKeys.team.all,
    queryFn: getTeamMembers,
    onError: handleQueryError,
    // Team member info doesn't change often
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to fetch a specific team member by ID
 */
export function useTeamMember(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.team.detail(id),
    queryFn: () => getTeamMemberById(id),
    enabled: enabled && !!id,
    onError: handleQueryError,
    // Team member details don't change often
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Mutation hook to update technician availability
 */
export function useUpdateTechnicianAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      technicianId,
      isAvailable,
      reason,
    }: {
      technicianId: string;
      isAvailable: boolean;
      reason?: string;
    }) => updateTechnicianAvailability(technicianId, isAvailable, reason),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Technician availability update');

      // Update the specific technician in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.technicians.detail(variables.technicianId),
          data
        );
      }

      // Invalidate technician lists and availability queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.technicians.all,
      });

      // Invalidate all availability queries
      queryClient.invalidateQueries({
        queryKey: ['technicians', 'available'],
        exact: false,
      });
    },
    onError: handleQueryError,
  });
}

/**
 * Hook to prefetch technician details
 */
export function usePrefetchTechnician() {
  const queryClient = useQueryClient();

  return (technicianId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.technicians.detail(technicianId),
      queryFn: () => getTechnicianById(technicianId),
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  };
}

/**
 * Hook to get technicians for multiple specializations
 */
export function useMultiSpecializationTechnicians(
  specializations: ServiceCategory[]
) {
  return useQuery({
    queryKey: ['technicians', 'multi-specialization', specializations],
    queryFn: async () => {
      const promises = specializations.map(spec =>
        getTechniciansBySpecialization(spec)
      );
      const results = await Promise.all(promises);

      // Combine and deduplicate technicians
      const allTechnicians = results.flatMap(result => result.data || []);
      const uniqueTechnicians = allTechnicians.filter(
        (tech, index, arr) => arr.findIndex(t => t.id === tech.id) === index
      );

      return uniqueTechnicians;
    },
    enabled: specializations.length > 0,
    onError: handleQueryError,
  });
}

/**
 * Hook to get technician availability for multiple dates
 */
export function useTechnicianMultiDateAvailability(
  technicianId: string,
  dates: string[],
  request: Omit<TechnicianAvailabilityRequest, 'date'>
) {
  return useQuery({
    queryKey: [
      'technicians',
      'multi-date-availability',
      technicianId,
      dates,
      request,
    ],
    queryFn: async () => {
      const promises = dates.map(date =>
        checkTechnicianAvailability(technicianId, { ...request, date })
      );
      const results = await Promise.all(promises);

      return dates.map((date, index) => ({
        date,
        availability: results[index].data,
      }));
    },
    enabled: !!technicianId && dates.length > 0,
    onError: handleQueryError,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to get best available technician for a service
 */
export function useBestAvailableTechnician(
  serviceCategory: ServiceCategory,
  area: string,
  date: string,
  timeSlot: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: [
      'technicians',
      'best-available',
      serviceCategory,
      area,
      date,
      timeSlot,
    ],
    queryFn: async () => {
      const result = await getAvailableTechnicians(
        serviceCategory,
        area,
        date,
        timeSlot
      );

      if (!result.data || result.data.length === 0) {
        return null;
      }

      // Return the technician with highest rating
      const bestTechnician = result.data.reduce((best, current) => {
        if (current.rating > best.rating) return current;
        if (
          current.rating === best.rating &&
          current.experience > best.experience
        )
          return current;
        return best;
      });

      return bestTechnician;
    },
    enabled: enabled && !!serviceCategory && !!area && !!date && !!timeSlot,
    onError: handleQueryError,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to get technician workload (number of active bookings)
 */
export function useTechnicianWorkload(
  technicianId: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['technicians', 'workload', technicianId],
    queryFn: async () => {
      // This would typically call a backend endpoint
      // For now, we'll mock it by getting today's schedule
      const today = new Date().toISOString().split('T')[0];
      const result = await getTechnicianSchedule(technicianId, today);

      if (!result.data) return 0;

      return result.data.timeSlots.filter(slot => slot.status === 'booked')
        .length;
    },
    enabled: enabled && !!technicianId,
    onError: handleQueryError,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
