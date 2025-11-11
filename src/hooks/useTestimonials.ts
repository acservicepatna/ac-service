/**
 * Testimonial-related React Query hooks
 * Custom hooks for fetching and managing testimonial data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  getFeaturedTestimonials,
  getTestimonialsByService,
  getTestimonialsByArea,
  getRecentTestimonials,
  getTestimonialStats,
  verifyTestimonial,
  deleteTestimonial,
  searchTestimonials,
  getHighRatingTestimonials,
  type CreateTestimonialRequest,
  type TestimonialListParams,
  type TestimonialFilters,
} from '@/services/testimonialService';
import {
  queryKeys,
  invalidateQueries,
  handleQueryError,
  handleMutationSuccess,
} from '@/lib/queryClient';

/**
 * Hook to fetch testimonials with filtering and pagination
 */
export function useTestimonials(params: TestimonialListParams = {}) {
  return useQuery({
    queryKey: queryKeys.testimonials.list(params),
    queryFn: () => getTestimonials(params),
    onError: handleQueryError,
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook to fetch a specific testimonial by ID
 */
export function useTestimonial(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.testimonials.detail(id),
    queryFn: () => getTestimonialById(id),
    enabled: enabled && !!id,
    onError: handleQueryError,
    // Testimonial details don't change often
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to fetch featured testimonials (high-rated, verified)
 */
export function useFeaturedTestimonials(limit: number = 6) {
  return useQuery({
    queryKey: queryKeys.testimonials.featured(limit),
    queryFn: () => getFeaturedTestimonials(limit),
    onError: handleQueryError,
    // Featured testimonials can be cached longer
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Hook to fetch testimonials by service
 */
export function useTestimonialsByService(
  serviceName: string,
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.testimonials.byService(serviceName, limit),
    queryFn: () => getTestimonialsByService(serviceName, limit),
    enabled: enabled && !!serviceName,
    onError: handleQueryError,
    // Service testimonials can be cached
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to fetch testimonials by area
 */
export function useTestimonialsByArea(
  area: string,
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.testimonials.byArea(area, limit),
    queryFn: () => getTestimonialsByArea(area, limit),
    enabled: enabled && !!area,
    onError: handleQueryError,
    // Area testimonials can be cached
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to fetch recent testimonials
 */
export function useRecentTestimonials(limit: number = 5) {
  return useQuery({
    queryKey: queryKeys.testimonials.recent(limit),
    queryFn: () => getRecentTestimonials(limit),
    onError: handleQueryError,
    // Recent testimonials should be relatively fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch high rating testimonials
 */
export function useHighRatingTestimonials(limit: number = 12) {
  return useQuery({
    queryKey: queryKeys.testimonials.highRating(limit),
    queryFn: () => getHighRatingTestimonials(limit),
    onError: handleQueryError,
    // High rating testimonials can be cached longer
    staleTime: 1000 * 60 * 20, // 20 minutes
  });
}

/**
 * Hook to fetch testimonial statistics
 */
export function useTestimonialStats() {
  return useQuery({
    queryKey: queryKeys.testimonials.stats(),
    queryFn: getTestimonialStats,
    onError: handleQueryError,
    // Stats can be cached longer
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Hook to search testimonials
 */
export function useTestimonialSearch(
  query: string,
  limit: number = 10,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: queryKeys.testimonials.search(query),
    queryFn: () => searchTestimonials(query, limit),
    enabled: enabled && !!query.trim(),
    onError: handleQueryError,
    // Don't cache search results for too long
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
}

/**
 * Mutation hook to create a new testimonial
 */
export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testimonialData: CreateTestimonialRequest) =>
      createTestimonial(testimonialData),
    onSuccess: data => {
      handleMutationSuccess(data, 'Testimonial creation');

      // Invalidate testimonial lists to include the new one
      invalidateQueries.afterTestimonial();

      // Add the new testimonial to relevant caches
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.testimonials.detail(data.data.id),
          data
        );
      }
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to verify a testimonial
 */
export function useVerifyTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      testimonialId,
      isVerified,
    }: {
      testimonialId: string;
      isVerified: boolean;
    }) => verifyTestimonial(testimonialId, isVerified),
    onSuccess: (data, variables) => {
      handleMutationSuccess(data, 'Testimonial verification');

      // Update the specific testimonial in cache
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.testimonials.detail(variables.testimonialId),
          data
        );
      }

      // Invalidate testimonial lists and stats
      invalidateQueries.afterTestimonial();
    },
    onError: handleQueryError,
  });
}

/**
 * Mutation hook to delete a testimonial
 */
export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (testimonialId: string) => deleteTestimonial(testimonialId),
    onSuccess: (data, testimonialId) => {
      handleMutationSuccess(data, 'Testimonial deletion');

      // Remove the testimonial from cache
      queryClient.removeQueries({
        queryKey: queryKeys.testimonials.detail(testimonialId),
      });

      // Invalidate testimonial lists and stats
      invalidateQueries.afterTestimonial();
    },
    onError: handleQueryError,
  });
}

/**
 * Hook to prefetch testimonial details
 */
export function usePrefetchTestimonial() {
  const queryClient = useQueryClient();

  return (testimonialId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.testimonials.detail(testimonialId),
      queryFn: () => getTestimonialById(testimonialId),
      staleTime: 1000 * 60 * 15, // 15 minutes
    });
  };
}

/**
 * Hook to get testimonials for homepage (featured + recent)
 */
export function useHomepageTestimonials() {
  const featuredQuery = useFeaturedTestimonials(3);
  const recentQuery = useRecentTestimonials(3);

  return {
    featured: featuredQuery,
    recent: recentQuery,
    isLoading: featuredQuery.isLoading || recentQuery.isLoading,
    error: featuredQuery.error || recentQuery.error,
  };
}

/**
 * Hook to get testimonial summary for a service
 */
export function useServiceTestimonialSummary(
  serviceName: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['testimonials', 'service-summary', serviceName],
    queryFn: async () => {
      const result = await getTestimonialsByService(serviceName, 50); // Get more for analysis

      if (!result.data || result.data.length === 0) {
        return {
          count: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          topReviews: [],
        };
      }

      const testimonials = result.data;
      const count = testimonials.length;
      const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
      const averageRating = Math.round((totalRating / count) * 10) / 10;

      // Rating distribution
      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      testimonials.forEach(t => {
        ratingDistribution[t.rating as keyof typeof ratingDistribution]++;
      });

      // Top reviews (highest rated, most recent)
      const topReviews = testimonials
        .filter(t => t.rating >= 4)
        .sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          return ratingDiff !== 0
            ? ratingDiff
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, 5);

      return {
        count,
        averageRating,
        ratingDistribution,
        topReviews,
      };
    },
    enabled: enabled && !!serviceName,
    onError: handleQueryError,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to get testimonials with infinite scroll
 */
export function useInfiniteTestimonials(filters: TestimonialFilters = {}) {
  return useQuery({
    queryKey: queryKeys.testimonials.list({ filters, limit: 20 }),
    queryFn: () => getTestimonials({ filters, limit: 20, page: 1 }),
    onError: handleQueryError,
    // Enable infinite loading by implementing getNextPageParam if needed
  });
}

/**
 * Hook to get testimonial trends (rating over time)
 */
export function useTestimonialTrends() {
  return useQuery({
    queryKey: ['testimonials', 'trends'],
    queryFn: async () => {
      const result = await getTestimonials({
        limit: 100,
        sortBy: 'date',
        sortOrder: 'desc',
      });

      if (!result.data) return [];

      // Group testimonials by month
      const monthlyData: Record<
        string,
        { count: number; totalRating: number }
      > = {};

      result.data.forEach(testimonial => {
        const month = new Date(testimonial.date).toISOString().slice(0, 7); // YYYY-MM

        if (!monthlyData[month]) {
          monthlyData[month] = { count: 0, totalRating: 0 };
        }

        monthlyData[month].count++;
        monthlyData[month].totalRating += testimonial.rating;
      });

      // Convert to array and calculate averages
      return Object.entries(monthlyData)
        .map(([month, data]) => ({
          month,
          count: data.count,
          averageRating: Math.round((data.totalRating / data.count) * 10) / 10,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
    },
    onError: handleQueryError,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
