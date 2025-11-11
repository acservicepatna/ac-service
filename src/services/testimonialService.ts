/**
 * Testimonial and Review Management API Functions
 * Handles customer testimonials, reviews, and feedback operations
 */

import type { Testimonial, ApiResponse, PaginatedResponse } from '@/types';
import {
  MOCK_TESTIMONIALS,
  simulateNetworkDelay,
  generateId,
} from '@/lib/mockData';
import {
  createApiResponse,
  createPaginatedResponse,
  handleApiError,
} from './api';

// In-memory storage for mock testimonials
const mockTestimonials = [...MOCK_TESTIMONIALS];

export interface TestimonialFilters {
  rating?: number;
  minRating?: number;
  service?: string;
  area?: string;
  verified?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface TestimonialListParams {
  page?: number;
  limit?: number;
  filters?: TestimonialFilters;
  sortBy?: 'date' | 'rating' | 'customerName';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateTestimonialRequest {
  customerName: string;
  customerArea: string;
  service: string;
  rating: number;
  comment: string;
  customerPhone?: string;
  appointmentId?: string;
  image?: string;
}

export interface TestimonialStats {
  total: number;
  averageRating: number;
  verified: number;
  ratingDistribution: { [rating: number]: number };
  topServices: { service: string; count: number; averageRating: number }[];
  topAreas: { area: string; count: number; averageRating: number }[];
  recentTestimonials: Testimonial[];
}

/**
 * Get all testimonials with filtering and pagination
 */
export const getTestimonials = async (
  params: TestimonialListParams = {}
): Promise<PaginatedResponse<Testimonial>> => {
  try {
    await simulateNetworkDelay(400, 700);

    const {
      page = 1,
      limit = 10,
      filters = {},
      sortBy = 'date',
      sortOrder = 'desc',
    } = params;

    let filteredTestimonials = [...mockTestimonials];

    // Apply filters
    if (filters.rating) {
      filteredTestimonials = filteredTestimonials.filter(
        testimonial => testimonial.rating === filters.rating
      );
    }

    if (filters.minRating) {
      filteredTestimonials = filteredTestimonials.filter(
        testimonial => testimonial.rating >= filters.minRating!
      );
    }

    if (filters.service) {
      filteredTestimonials = filteredTestimonials.filter(testimonial =>
        testimonial.service
          .toLowerCase()
          .includes(filters.service!.toLowerCase())
      );
    }

    if (filters.area) {
      filteredTestimonials = filteredTestimonials.filter(testimonial =>
        testimonial.customerArea
          .toLowerCase()
          .includes(filters.area!.toLowerCase())
      );
    }

    if (filters.verified !== undefined) {
      filteredTestimonials = filteredTestimonials.filter(
        testimonial => testimonial.verified === filters.verified
      );
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filteredTestimonials = filteredTestimonials.filter(
        testimonial => new Date(testimonial.date) >= fromDate
      );
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      filteredTestimonials = filteredTestimonials.filter(
        testimonial => new Date(testimonial.date) <= toDate
      );
    }

    // Apply sorting
    filteredTestimonials.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'customerName':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTestimonials = filteredTestimonials.slice(
      startIndex,
      endIndex
    );

    return createPaginatedResponse(
      paginatedTestimonials,
      page,
      limit,
      filteredTestimonials.length
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get testimonial by ID
 */
export const getTestimonialById = async (
  id: string
): Promise<ApiResponse<Testimonial | null>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const testimonial = mockTestimonials.find(test => test.id === id);

    if (!testimonial) {
      return createApiResponse(null, `Testimonial with ID ${id} not found`);
    }

    return createApiResponse(testimonial, 'Testimonial retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Create a new testimonial
 */
export const createTestimonial = async (
  testimonialRequest: CreateTestimonialRequest
): Promise<ApiResponse<Testimonial>> => {
  try {
    await simulateNetworkDelay(500, 800);

    // Validate required fields
    if (!testimonialRequest.customerName.trim()) {
      throw new Error('Customer name is required');
    }

    if (!testimonialRequest.comment.trim()) {
      throw new Error('Comment is required');
    }

    if (testimonialRequest.rating < 1 || testimonialRequest.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Create new testimonial
    const newTestimonial: Testimonial = {
      id: generateId('test'),
      customerName: testimonialRequest.customerName.trim(),
      customerArea: testimonialRequest.customerArea.trim(),
      service: testimonialRequest.service.trim(),
      rating: testimonialRequest.rating,
      comment: testimonialRequest.comment.trim(),
      date: new Date(),
      verified: false, // New testimonials need verification
      image: testimonialRequest.image,
    };

    // Add to mock storage
    mockTestimonials.push(newTestimonial);

    return createApiResponse(
      newTestimonial,
      'Testimonial submitted successfully. Thank you for your feedback!'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get featured testimonials (high-rated, verified)
 */
export const getFeaturedTestimonials = async (
  limit: number = 6
): Promise<ApiResponse<Testimonial[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const featuredTestimonials = mockTestimonials
      .filter(testimonial => testimonial.verified && testimonial.rating >= 4)
      .sort((a, b) => {
        // Sort by rating first, then by date
        const ratingDiff = b.rating - a.rating;
        return ratingDiff !== 0
          ? ratingDiff
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, limit);

    return createApiResponse(
      featuredTestimonials,
      `Retrieved ${featuredTestimonials.length} featured testimonials`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get testimonials by service
 */
export const getTestimonialsByService = async (
  serviceName: string,
  limit: number = 10
): Promise<ApiResponse<Testimonial[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const serviceTestimonials = mockTestimonials
      .filter(
        testimonial =>
          testimonial.service
            .toLowerCase()
            .includes(serviceName.toLowerCase()) && testimonial.verified
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return createApiResponse(
      serviceTestimonials,
      `Found ${serviceTestimonials.length} testimonials for ${serviceName}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get testimonials by area
 */
export const getTestimonialsByArea = async (
  area: string,
  limit: number = 10
): Promise<ApiResponse<Testimonial[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const areaTestimonials = mockTestimonials
      .filter(
        testimonial =>
          testimonial.customerArea.toLowerCase().includes(area.toLowerCase()) &&
          testimonial.verified
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return createApiResponse(
      areaTestimonials,
      `Found ${areaTestimonials.length} testimonials from ${area}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get recent testimonials
 */
export const getRecentTestimonials = async (
  limit: number = 5
): Promise<ApiResponse<Testimonial[]>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const recentTestimonials = mockTestimonials
      .filter(testimonial => testimonial.verified)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return createApiResponse(
      recentTestimonials,
      `Retrieved ${recentTestimonials.length} recent testimonials`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get testimonial statistics
 */
export const getTestimonialStats = async (): Promise<
  ApiResponse<TestimonialStats>
> => {
  try {
    await simulateNetworkDelay(400, 600);

    const total = mockTestimonials.length;
    const verified = mockTestimonials.filter(t => t.verified).length;

    // Calculate average rating
    const totalRating = mockTestimonials.reduce((sum, t) => sum + t.rating, 0);
    const averageRating =
      total > 0 ? Math.round((totalRating / total) * 10) / 10 : 0;

    // Rating distribution
    const ratingDistribution: { [rating: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    mockTestimonials.forEach(t => {
      ratingDistribution[t.rating]++;
    });

    // Top services
    const serviceCounts: Record<
      string,
      { count: number; totalRating: number }
    > = {};
    mockTestimonials.forEach(t => {
      if (!serviceCounts[t.service]) {
        serviceCounts[t.service] = { count: 0, totalRating: 0 };
      }
      serviceCounts[t.service].count++;
      serviceCounts[t.service].totalRating += t.rating;
    });

    const topServices = Object.entries(serviceCounts)
      .map(([service, data]) => ({
        service,
        count: data.count,
        averageRating: Math.round((data.totalRating / data.count) * 10) / 10,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Top areas
    const areaCounts: Record<string, { count: number; totalRating: number }> =
      {};
    mockTestimonials.forEach(t => {
      if (!areaCounts[t.customerArea]) {
        areaCounts[t.customerArea] = { count: 0, totalRating: 0 };
      }
      areaCounts[t.customerArea].count++;
      areaCounts[t.customerArea].totalRating += t.rating;
    });

    const topAreas = Object.entries(areaCounts)
      .map(([area, data]) => ({
        area,
        count: data.count,
        averageRating: Math.round((data.totalRating / data.count) * 10) / 10,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent testimonials
    const recentTestimonials = mockTestimonials
      .filter(t => t.verified)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);

    const stats: TestimonialStats = {
      total,
      averageRating,
      verified,
      ratingDistribution,
      topServices,
      topAreas,
      recentTestimonials,
    };

    return createApiResponse(
      stats,
      'Testimonial statistics calculated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Verify a testimonial
 */
export const verifyTestimonial = async (
  testimonialId: string,
  isVerified: boolean = true
): Promise<ApiResponse<Testimonial>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const testimonialIndex = mockTestimonials.findIndex(
      t => t.id === testimonialId
    );

    if (testimonialIndex === -1) {
      throw new Error(`Testimonial with ID ${testimonialId} not found`);
    }

    mockTestimonials[testimonialIndex].verified = isVerified;

    return createApiResponse(
      mockTestimonials[testimonialIndex],
      `Testimonial ${isVerified ? 'verified' : 'unverified'} successfully`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete a testimonial
 */
export const deleteTestimonial = async (
  testimonialId: string
): Promise<ApiResponse<boolean>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const testimonialIndex = mockTestimonials.findIndex(
      t => t.id === testimonialId
    );

    if (testimonialIndex === -1) {
      throw new Error(`Testimonial with ID ${testimonialId} not found`);
    }

    mockTestimonials.splice(testimonialIndex, 1);

    return createApiResponse(true, 'Testimonial deleted successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search testimonials
 */
export const searchTestimonials = async (
  query: string,
  limit: number = 10
): Promise<ApiResponse<Testimonial[]>> => {
  try {
    await simulateNetworkDelay(300, 600);

    if (!query.trim()) {
      return createApiResponse([], 'Please provide a search query');
    }

    const searchTerm = query.toLowerCase().trim();

    const matchedTestimonials = mockTestimonials
      .filter(testimonial => {
        return (
          testimonial.customerName.toLowerCase().includes(searchTerm) ||
          testimonial.customerArea.toLowerCase().includes(searchTerm) ||
          testimonial.service.toLowerCase().includes(searchTerm) ||
          testimonial.comment.toLowerCase().includes(searchTerm)
        );
      })
      .filter(t => t.verified) // Only show verified testimonials in search
      .slice(0, limit);

    return createApiResponse(
      matchedTestimonials,
      `Found ${matchedTestimonials.length} testimonials matching "${query}"`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get testimonials with high ratings (4 stars and above)
 */
export const getHighRatingTestimonials = async (
  limit: number = 12
): Promise<ApiResponse<Testimonial[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const highRatingTestimonials = mockTestimonials
      .filter(testimonial => testimonial.verified && testimonial.rating >= 4)
      .sort((a, b) => {
        const ratingDiff = b.rating - a.rating;
        return ratingDiff !== 0
          ? ratingDiff
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, limit);

    return createApiResponse(
      highRatingTestimonials,
      `Retrieved ${highRatingTestimonials.length} high-rating testimonials`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};
