/**
 * Service Management API Functions
 * Handles all service-related API operations
 */

import type {
  Service,
  ServiceCategory,
  ApiResponse,
  PaginatedResponse,
} from '@/types';
import { MOCK_SERVICES, simulateNetworkDelay } from '@/lib/mockData';
import {
  createApiResponse,
  createPaginatedResponse,
  handleApiError,
} from './api';

export interface ServiceFilters {
  category?: ServiceCategory;
  minPrice?: number;
  maxPrice?: number;
  acType?: string;
  isEmergency?: boolean;
  search?: string;
}

export interface ServiceListParams {
  page?: number;
  limit?: number;
  filters?: ServiceFilters;
  sortBy?: 'name' | 'price' | 'duration' | 'category';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Get all services with filtering and pagination
 */
export const getServices = async (
  params: ServiceListParams = {}
): Promise<PaginatedResponse<Service>> => {
  try {
    await simulateNetworkDelay(400, 800);

    const {
      page = 1,
      limit = 10,
      filters = {},
      sortBy = 'name',
      sortOrder = 'asc',
    } = params;

    let filteredServices = [...MOCK_SERVICES];

    // Apply filters
    if (filters.category) {
      filteredServices = filteredServices.filter(
        service => service.category === filters.category
      );
    }

    if (filters.minPrice) {
      filteredServices = filteredServices.filter(
        service => service.price.min >= filters.minPrice!
      );
    }

    if (filters.maxPrice) {
      filteredServices = filteredServices.filter(
        service => service.price.min <= filters.maxPrice!
      );
    }

    if (filters.acType) {
      filteredServices = filteredServices.filter(service =>
        service.availableFor.includes(filters.acType as any)
      );
    }

    if (filters.isEmergency !== undefined) {
      filteredServices = filteredServices.filter(
        service => service.isEmergency === filters.isEmergency
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredServices = filteredServices.filter(
        service =>
          service.name.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm) ||
          service.features.some(feature =>
            feature.toLowerCase().includes(searchTerm)
          )
      );
    }

    // Apply sorting
    filteredServices.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price.min - b.price.min;
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);

    return createPaginatedResponse(
      paginatedServices,
      page,
      limit,
      filteredServices.length
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get service by ID
 */
export const getServiceById = async (
  id: string
): Promise<ApiResponse<Service | null>> => {
  try {
    await simulateNetworkDelay(200, 500);

    const service = MOCK_SERVICES.find(service => service.id === id);

    if (!service) {
      return createApiResponse(null, `Service with ID ${id} not found`);
    }

    return createApiResponse(service, 'Service retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get services by category
 */
export const getServicesByCategory = async (
  category: ServiceCategory
): Promise<ApiResponse<Service[]>> => {
  try {
    await simulateNetworkDelay(300, 600);

    const services = MOCK_SERVICES.filter(
      service => service.category === category
    );

    return createApiResponse(
      services,
      `Found ${services.length} services in ${category} category`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get emergency services
 */
export const getEmergencyServices = async (): Promise<
  ApiResponse<Service[]>
> => {
  try {
    await simulateNetworkDelay(200, 400);

    const emergencyServices = MOCK_SERVICES.filter(
      service => service.isEmergency
    );

    return createApiResponse(
      emergencyServices,
      `Found ${emergencyServices.length} emergency services`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get service categories with counts
 */
export const getServiceCategories = async (): Promise<
  ApiResponse<
    {
      category: ServiceCategory;
      count: number;
      services: Service[];
    }[]
  >
> => {
  try {
    await simulateNetworkDelay(250, 450);

    const categories: ServiceCategory[] = [
      'maintenance',
      'repair',
      'installation',
      'cleaning',
      'emergency',
    ];

    const categoriesWithCounts = categories.map(category => {
      const services = MOCK_SERVICES.filter(
        service => service.category === category
      );
      return {
        category,
        count: services.length,
        services: services.slice(0, 3), // Return first 3 services as preview
      };
    });

    return createApiResponse(
      categoriesWithCounts,
      'Service categories retrieved successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get services compatible with AC type
 */
export const getServicesForACType = async (
  acType: string
): Promise<ApiResponse<Service[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const compatibleServices = MOCK_SERVICES.filter(service =>
      service.availableFor.includes(acType as any)
    );

    return createApiResponse(
      compatibleServices,
      `Found ${compatibleServices.length} services compatible with ${acType} AC`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search services
 */
export const searchServices = async (
  query: string,
  limit: number = 10
): Promise<ApiResponse<Service[]>> => {
  try {
    await simulateNetworkDelay(300, 700);

    if (!query.trim()) {
      return createApiResponse([], 'Please provide a search query');
    }

    const searchTerm = query.toLowerCase().trim();

    const matchedServices = MOCK_SERVICES.filter(service => {
      return (
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm) ||
        service.features.some(feature =>
          feature.toLowerCase().includes(searchTerm)
        )
      );
    }).slice(0, limit);

    return createApiResponse(
      matchedServices,
      `Found ${matchedServices.length} services matching "${query}"`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get service pricing estimate
 */
export const getServicePricingEstimate = async (
  serviceId: string,
  acType?: string,
  area?: string
): Promise<
  ApiResponse<{
    basePrice: number;
    areaCharge: number;
    totalEstimate: number;
    service: Service;
  }>
> => {
  try {
    await simulateNetworkDelay(200, 400);

    const service = MOCK_SERVICES.find(s => s.id === serviceId);

    if (!service) {
      throw new Error(`Service with ID ${serviceId} not found`);
    }

    const basePrice = service.price.min;
    let areaCharge = 0;

    // Add area-based charges (mock calculation)
    if (area) {
      const areaCharges: Record<string, number> = {
        Danapur: 150,
        'Rajendra Nagar': 100,
        Patliputra: 50,
        Digha: 50,
        'Patrakar Nagar': 50,
      };
      areaCharge = areaCharges[area] || 0;
    }

    const totalEstimate = basePrice + areaCharge;

    return createApiResponse(
      {
        basePrice,
        areaCharge,
        totalEstimate,
        service,
      },
      'Pricing estimate calculated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get recommended services based on AC details
 */
export const getRecommendedServices = async (
  acBrand: string,
  acType: string,
  acAge: number
): Promise<ApiResponse<Service[]>> => {
  try {
    await simulateNetworkDelay(400, 600);

    let recommendedServices: Service[] = [];

    // Recommendation logic based on AC age and type
    if (acAge < 1) {
      // New AC - basic maintenance
      recommendedServices = MOCK_SERVICES.filter(
        s => s.category === 'maintenance' && s.name.includes('Basic')
      );
    } else if (acAge >= 1 && acAge <= 3) {
      // 1-3 years - regular maintenance and cleaning
      recommendedServices = MOCK_SERVICES.filter(
        s =>
          ['maintenance', 'cleaning'].includes(s.category) &&
          s.availableFor.includes(acType as any)
      );
    } else if (acAge > 3) {
      // Older AC - comprehensive service and potential repairs
      recommendedServices = MOCK_SERVICES.filter(
        s =>
          ['maintenance', 'cleaning', 'repair'].includes(s.category) &&
          s.availableFor.includes(acType as any)
      );
    }

    // Limit to 5 recommendations
    recommendedServices = recommendedServices.slice(0, 5);

    return createApiResponse(
      recommendedServices,
      `Found ${recommendedServices.length} recommended services for ${acAge}-year-old ${acBrand} ${acType} AC`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};
