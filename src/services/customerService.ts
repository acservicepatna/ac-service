/**
 * Customer Management API Functions
 * Handles customer profiles, contact information, and customer-related operations
 */

import type {
  Customer,
  CustomerDetails,
  ApiResponse,
  PaginatedResponse,
  Address,
} from '@/types';
import {
  MOCK_CUSTOMERS,
  simulateNetworkDelay,
  generateId,
} from '@/lib/mockData';
import {
  createApiResponse,
  createPaginatedResponse,
  handleApiError,
} from './api';

// In-memory storage for mock customers
const mockCustomers = [...MOCK_CUSTOMERS];

export interface CustomerFilters {
  customerType?: 'residential' | 'commercial';
  area?: string;
  search?: string;
  hasEmail?: boolean;
  loyaltyTier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface CustomerListParams {
  page?: number;
  limit?: number;
  filters?: CustomerFilters;
  sortBy?: 'name' | 'createdAt' | 'totalBookings' | 'loyaltyPoints';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateCustomerRequest {
  name: string;
  phone: string;
  email?: string;
  alternatePhone?: string;
  address: Omit<Address, 'id'>;
  customerType: 'residential' | 'commercial';
}

export interface UpdateCustomerRequest {
  name?: string;
  email?: string;
  alternatePhone?: string;
  customerType?: 'residential' | 'commercial';
}

/**
 * Create a new customer
 */
export const createCustomer = async (
  customerRequest: CreateCustomerRequest
): Promise<ApiResponse<Customer>> => {
  try {
    await simulateNetworkDelay(500, 800);

    // Validate required fields
    if (!customerRequest.name.trim()) {
      throw new Error('Customer name is required');
    }

    if (!customerRequest.phone.trim()) {
      throw new Error('Phone number is required');
    }

    // Check if customer with same phone already exists
    const existingCustomer = mockCustomers.find(
      customer => customer.phone === customerRequest.phone
    );

    if (existingCustomer) {
      throw new Error('Customer with this phone number already exists');
    }

    // Create new customer
    const newCustomer: Customer = {
      id: generateId('cust'),
      name: customerRequest.name.trim(),
      phone: customerRequest.phone.trim(),
      email: customerRequest.email?.trim(),
      alternatePhone: customerRequest.alternatePhone?.trim(),
      addresses: [
        {
          id: generateId('addr'),
          ...customerRequest.address,
        },
      ],
      customerType: customerRequest.customerType,
      loyaltyPoints: 0,
      totalBookings: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock storage
    mockCustomers.push(newCustomer);

    return createApiResponse(newCustomer, 'Customer created successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get customer by ID
 */
export const getCustomerById = async (
  id: string
): Promise<ApiResponse<Customer | null>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const customer = mockCustomers.find(customer => customer.id === id);

    if (!customer) {
      return createApiResponse(null, `Customer with ID ${id} not found`);
    }

    return createApiResponse(customer, 'Customer retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get customer by phone number
 */
export const getCustomerByPhone = async (
  phone: string
): Promise<ApiResponse<Customer | null>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const customer = mockCustomers.find(customer => customer.phone === phone);

    if (!customer) {
      return createApiResponse(null, `Customer with phone ${phone} not found`);
    }

    return createApiResponse(customer, 'Customer retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get all customers with filtering and pagination
 */
export const getCustomers = async (
  params: CustomerListParams = {}
): Promise<PaginatedResponse<Customer>> => {
  try {
    await simulateNetworkDelay(400, 700);

    const {
      page = 1,
      limit = 10,
      filters = {},
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    let filteredCustomers = [...mockCustomers];

    // Apply filters
    if (filters.customerType) {
      filteredCustomers = filteredCustomers.filter(
        customer => customer.customerType === filters.customerType
      );
    }

    if (filters.area) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.addresses.some(address =>
          address.area.toLowerCase().includes(filters.area!.toLowerCase())
        )
      );
    }

    if (filters.hasEmail !== undefined) {
      filteredCustomers = filteredCustomers.filter(customer =>
        filters.hasEmail ? !!customer.email : !customer.email
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        customer =>
          customer.name.toLowerCase().includes(searchTerm) ||
          customer.phone.includes(searchTerm) ||
          customer.email?.toLowerCase().includes(searchTerm) ||
          customer.addresses.some(
            addr =>
              addr.area.toLowerCase().includes(searchTerm) ||
              addr.street.toLowerCase().includes(searchTerm)
          )
      );
    }

    if (filters.loyaltyTier) {
      // Mock loyalty tier calculation based on points
      const tierRanges = {
        bronze: [0, 99],
        silver: [100, 299],
        gold: [300, 699],
        platinum: [700, Infinity],
      };

      const [min, max] = tierRanges[filters.loyaltyTier];
      filteredCustomers = filteredCustomers.filter(
        customer =>
          (customer.loyaltyPoints || 0) >= min &&
          (customer.loyaltyPoints || 0) <= max
      );
    }

    // Apply sorting
    filteredCustomers.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'createdAt':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'totalBookings':
          comparison = a.totalBookings - b.totalBookings;
          break;
        case 'loyaltyPoints':
          comparison = (a.loyaltyPoints || 0) - (b.loyaltyPoints || 0);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    return createPaginatedResponse(
      paginatedCustomers,
      page,
      limit,
      filteredCustomers.length
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update customer information
 */
export const updateCustomer = async (
  id: string,
  updateRequest: UpdateCustomerRequest
): Promise<ApiResponse<Customer>> => {
  try {
    await simulateNetworkDelay(400, 600);

    const customerIndex = mockCustomers.findIndex(
      customer => customer.id === id
    );

    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    // Update customer
    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      ...updateRequest,
      updatedAt: new Date(),
    };

    return createApiResponse(
      mockCustomers[customerIndex],
      'Customer updated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Add address to customer
 */
export const addCustomerAddress = async (
  customerId: string,
  address: Omit<Address, 'id'>
): Promise<ApiResponse<Customer>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const customerIndex = mockCustomers.findIndex(
      customer => customer.id === customerId
    );

    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const newAddress: Address = {
      id: generateId('addr'),
      ...address,
    };

    // If this is set as default, make other addresses non-default
    if (address.isDefault) {
      mockCustomers[customerIndex].addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    mockCustomers[customerIndex].addresses.push(newAddress);
    mockCustomers[customerIndex].updatedAt = new Date();

    return createApiResponse(
      mockCustomers[customerIndex],
      'Address added successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update customer address
 */
export const updateCustomerAddress = async (
  customerId: string,
  addressId: string,
  addressUpdate: Partial<Omit<Address, 'id'>>
): Promise<ApiResponse<Customer>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const customerIndex = mockCustomers.findIndex(
      customer => customer.id === customerId
    );

    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const addressIndex = mockCustomers[customerIndex].addresses.findIndex(
      addr => addr.id === addressId
    );

    if (addressIndex === -1) {
      throw new Error(`Address with ID ${addressId} not found`);
    }

    // If setting as default, make other addresses non-default
    if (addressUpdate.isDefault) {
      mockCustomers[customerIndex].addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    // Update address
    mockCustomers[customerIndex].addresses[addressIndex] = {
      ...mockCustomers[customerIndex].addresses[addressIndex],
      ...addressUpdate,
    };

    mockCustomers[customerIndex].updatedAt = new Date();

    return createApiResponse(
      mockCustomers[customerIndex],
      'Address updated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete customer address
 */
export const deleteCustomerAddress = async (
  customerId: string,
  addressId: string
): Promise<ApiResponse<Customer>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const customerIndex = mockCustomers.findIndex(
      customer => customer.id === customerId
    );

    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const addressIndex = mockCustomers[customerIndex].addresses.findIndex(
      addr => addr.id === addressId
    );

    if (addressIndex === -1) {
      throw new Error(`Address with ID ${addressId} not found`);
    }

    // Don't allow deleting the last address
    if (mockCustomers[customerIndex].addresses.length === 1) {
      throw new Error(
        'Cannot delete the last address. Customer must have at least one address.'
      );
    }

    const wasDefault =
      mockCustomers[customerIndex].addresses[addressIndex].isDefault;

    // Remove address
    mockCustomers[customerIndex].addresses.splice(addressIndex, 1);

    // If deleted address was default, make first remaining address default
    if (wasDefault && mockCustomers[customerIndex].addresses.length > 0) {
      mockCustomers[customerIndex].addresses[0].isDefault = true;
    }

    mockCustomers[customerIndex].updatedAt = new Date();

    return createApiResponse(
      mockCustomers[customerIndex],
      'Address deleted successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update customer loyalty points
 */
export const updateCustomerLoyaltyPoints = async (
  customerId: string,
  pointsChange: number,
  reason: string
): Promise<ApiResponse<Customer>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const customerIndex = mockCustomers.findIndex(
      customer => customer.id === customerId
    );

    if (customerIndex === -1) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const currentPoints = mockCustomers[customerIndex].loyaltyPoints || 0;
    const newPoints = Math.max(0, currentPoints + pointsChange);

    mockCustomers[customerIndex].loyaltyPoints = newPoints;
    mockCustomers[customerIndex].updatedAt = new Date();

    return createApiResponse(
      mockCustomers[customerIndex],
      `Loyalty points ${pointsChange > 0 ? 'added' : 'deducted'}: ${reason}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get customer statistics
 */
export const getCustomerStats = async (): Promise<
  ApiResponse<{
    total: number;
    residential: number;
    commercial: number;
    withEmail: number;
    loyaltyTiers: {
      bronze: number;
      silver: number;
      gold: number;
      platinum: number;
    };
    topAreas: { area: string; count: number }[];
  }>
> => {
  try {
    await simulateNetworkDelay(300, 500);

    const total = mockCustomers.length;
    const residential = mockCustomers.filter(
      c => c.customerType === 'residential'
    ).length;
    const commercial = mockCustomers.filter(
      c => c.customerType === 'commercial'
    ).length;
    const withEmail = mockCustomers.filter(c => !!c.email).length;

    // Calculate loyalty tiers
    const loyaltyTiers = {
      bronze: mockCustomers.filter(c => (c.loyaltyPoints || 0) < 100).length,
      silver: mockCustomers.filter(
        c => (c.loyaltyPoints || 0) >= 100 && (c.loyaltyPoints || 0) < 300
      ).length,
      gold: mockCustomers.filter(
        c => (c.loyaltyPoints || 0) >= 300 && (c.loyaltyPoints || 0) < 700
      ).length,
      platinum: mockCustomers.filter(c => (c.loyaltyPoints || 0) >= 700).length,
    };

    // Top areas
    const areaCounts: Record<string, number> = {};
    mockCustomers.forEach(customer => {
      customer.addresses.forEach(address => {
        areaCounts[address.area] = (areaCounts[address.area] || 0) + 1;
      });
    });

    const topAreas = Object.entries(areaCounts)
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const stats = {
      total,
      residential,
      commercial,
      withEmail,
      loyaltyTiers,
      topAreas,
    };

    return createApiResponse(
      stats,
      'Customer statistics calculated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search customers
 */
export const searchCustomers = async (
  query: string,
  limit: number = 10
): Promise<ApiResponse<Customer[]>> => {
  try {
    await simulateNetworkDelay(300, 600);

    if (!query.trim()) {
      return createApiResponse([], 'Please provide a search query');
    }

    const searchTerm = query.toLowerCase().trim();

    const matchedCustomers = mockCustomers
      .filter(customer => {
        return (
          customer.name.toLowerCase().includes(searchTerm) ||
          customer.phone.includes(searchTerm) ||
          customer.email?.toLowerCase().includes(searchTerm) ||
          customer.addresses.some(
            addr =>
              addr.area.toLowerCase().includes(searchTerm) ||
              addr.street.toLowerCase().includes(searchTerm) ||
              addr.pincode.includes(searchTerm)
          )
        );
      })
      .slice(0, limit);

    return createApiResponse(
      matchedCustomers,
      `Found ${matchedCustomers.length} customers matching "${query}"`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};
