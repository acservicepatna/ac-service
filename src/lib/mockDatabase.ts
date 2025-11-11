/**
 * Mock Database Simulation
 * Demonstrates realistic API usage with pagination, search, filtering, and authentication
 */

import {
  MOCK_SERVICES,
  MOCK_CUSTOMERS,
  MOCK_APPOINTMENTS,
  MOCK_TECHNICIANS,
  MOCK_TESTIMONIALS,
  MOCK_BOOKING_AVAILABILITY,
  simulateNetworkDelay,
  generateId,
} from './mockData';

import type {
  Service,
  Customer,
  Appointment,
  Technician,
  Testimonial,
  BookingRequest,
  ServiceCategory,
  AppointmentStatus,
} from '@/types';

/**
 * Mock Authentication State
 */
export interface MockAuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    role: 'customer' | 'admin' | 'technician';
    phone?: string;
    email?: string;
  } | null;
  permissions: string[];
}

let mockAuthState: MockAuthState = {
  isAuthenticated: false,
  user: null,
  permissions: [],
};

/**
 * Mock Database Operations
 */
export class MockDatabase {
  // Simulate database tables
  private static services: Service[] = [...MOCK_SERVICES];
  private static customers: Customer[] = [...MOCK_CUSTOMERS];
  private static appointments: Appointment[] = [...MOCK_APPOINTMENTS];
  private static technicians: Technician[] = [...MOCK_TECHNICIANS];
  private static testimonials: Testimonial[] = [...MOCK_TESTIMONIALS];

  /**
   * Authentication Methods
   */
  static async authenticate(
    phone: string,
    otp: string
  ): Promise<MockAuthState> {
    await simulateNetworkDelay(800, 1200);

    // Mock authentication logic
    if (otp === '123456') {
      const customer = this.customers.find(c => c.phone === phone);

      mockAuthState = {
        isAuthenticated: true,
        user: customer
          ? {
              id: customer.id,
              name: customer.name,
              role: 'customer',
              phone: customer.phone,
              email: customer.email,
            }
          : {
              id: generateId('user'),
              name: 'Guest User',
              role: 'customer',
              phone,
            },
        permissions: ['booking:create', 'booking:read', 'profile:update'],
      };
    } else {
      throw new Error('Invalid OTP');
    }

    return mockAuthState;
  }

  static getAuthState(): MockAuthState {
    return mockAuthState;
  }

  static logout(): void {
    mockAuthState = {
      isAuthenticated: false,
      user: null,
      permissions: [],
    };
  }

  /**
   * Service Operations with Advanced Filtering
   */
  static async getServices(params: {
    page?: number;
    limit?: number;
    category?: ServiceCategory;
    priceRange?: [number, number];
    acTypes?: string[];
    search?: string;
    sortBy?: 'name' | 'price' | 'rating' | 'popularity';
    sortOrder?: 'asc' | 'desc';
  }) {
    await simulateNetworkDelay(300, 800);

    const {
      page = 1,
      limit = 10,
      category,
      priceRange,
      acTypes,
      search,
      sortBy = 'name',
      sortOrder = 'asc',
    } = params;

    let filtered = [...this.services];

    // Apply filters
    if (category) {
      filtered = filtered.filter(s => s.category === category);
    }

    if (priceRange) {
      filtered = filtered.filter(
        s => s.price.min >= priceRange[0] && s.price.min <= priceRange[1]
      );
    }

    if (acTypes && acTypes.length > 0) {
      filtered = filtered.filter(s =>
        s.availableFor.some(type => acTypes.includes(type))
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.description.toLowerCase().includes(searchTerm) ||
          s.features.some(f => f.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price.min - b.price.min;
          break;
        case 'rating':
          // Mock rating based on service ID
          const ratingA = parseFloat((4 + Math.random()).toFixed(1));
          const ratingB = parseFloat((4 + Math.random()).toFixed(1));
          comparison = ratingA - ratingB;
          break;
        case 'popularity':
          // Mock popularity based on service position
          comparison = this.services.indexOf(a) - this.services.indexOf(b);
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: start + limit < total,
        hasPrevPage: page > 1,
      },
      filters: {
        appliedFilters: { category, priceRange, acTypes, search },
        availableCategories: [...new Set(this.services.map(s => s.category))],
        priceRange: [
          Math.min(...this.services.map(s => s.price.min)),
          Math.max(...this.services.map(s => s.price.max || s.price.min)),
        ],
      },
    };
  }

  /**
   * Advanced Booking Operations
   */
  static async createBooking(request: BookingRequest): Promise<{
    appointment: Appointment;
    estimatedCost: number;
    nextSteps: string[];
    confirmationNumber: string;
  }> {
    await simulateNetworkDelay(800, 1500);

    // Validate authentication
    if (!mockAuthState.isAuthenticated) {
      throw new Error('Authentication required');
    }

    // Validate availability
    const isAvailable = await this.checkSlotAvailability(
      request.preferredDate,
      request.preferredTimeSlot.label,
      request.address.serviceArea
    );

    if (!isAvailable) {
      throw new Error('Selected time slot is not available');
    }

    // Find service
    const service = this.services.find(s => s.id === request.serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Calculate cost
    const baseCost = service.price.min;
    const areaCost = this.calculateAreaCost(request.address.serviceArea);
    const urgencyCost =
      request.urgency === 'emergency'
        ? 300
        : request.urgency === 'urgent'
          ? 150
          : 0;
    const estimatedCost = baseCost + areaCost + urgencyCost;

    // Create appointment
    const newAppointment: Appointment = {
      id: generateId('apt'),
      customerId: request.customerId || generateId('cust'),
      serviceId: request.serviceId,
      scheduledAt: new Date(
        request.preferredDate + 'T' + request.preferredTimeSlot.start
      ),
      estimatedDuration: service.duration,
      status: 'scheduled',
      priority:
        request.urgency === 'emergency'
          ? 'emergency'
          : request.urgency === 'urgent'
            ? 'high'
            : 'medium',
      notes: request.notes,
      acDetails: request.acDetails,
      address: request.address,
      pricing: {
        estimated: estimatedCost,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Assign technician
    newAppointment.technicianId = await this.assignTechnician(
      service.category,
      request.address.serviceArea,
      request.preferredDate,
      request.urgency === 'emergency'
    );

    this.appointments.push(newAppointment);

    const confirmationNumber = `AC${newAppointment.id.slice(-6).toUpperCase()}`;

    return {
      appointment: newAppointment,
      estimatedCost,
      nextSteps: [
        'You will receive a confirmation call within 15 minutes',
        'Technician will contact you 30 minutes before arrival',
        'Please have your AC unit accessible for service',
        'Payment can be made after service completion',
      ],
      confirmationNumber,
    };
  }

  /**
   * Smart Technician Assignment
   */
  private static async assignTechnician(
    category: ServiceCategory,
    area: string,
    date: string,
    isEmergency: boolean
  ): Promise<string | undefined> {
    await simulateNetworkDelay(200, 400);

    const availableTechs = this.technicians.filter(tech => {
      // Check specialization
      const hasSkill = tech.specializations.includes(category);

      // Check area coverage
      const coversArea = tech.availableAreas.some(
        techArea => techArea.toLowerCase() === area.toLowerCase()
      );

      // Check availability
      const isAvailable = tech.isAvailable;

      // Check emergency availability if needed
      const emergencyOk = isEmergency ? tech.emergencyAvailable : true;

      return hasSkill && coversArea && isAvailable && emergencyOk;
    });

    if (availableTechs.length === 0) {
      return undefined;
    }

    // Sort by rating and experience
    availableTechs.sort((a, b) => {
      const ratingDiff = b.rating - a.rating;
      return ratingDiff !== 0 ? ratingDiff : b.experience - a.experience;
    });

    return availableTechs[0].id;
  }

  /**
   * Dynamic Availability Checking
   */
  private static async checkSlotAvailability(
    date: string,
    timeSlot: string,
    area: string
  ): Promise<boolean> {
    await simulateNetworkDelay(150, 300);

    // Check existing bookings for the date and area
    const existingBookings = this.appointments.filter(apt => {
      const aptDate = apt.scheduledAt.toISOString().split('T')[0];
      const aptArea = apt.address.serviceArea;

      return aptDate === date && aptArea === area && apt.status !== 'cancelled';
    });

    // Simple availability logic: max 5 bookings per time slot per area
    const slotBookings = existingBookings.filter(apt => {
      const hour = apt.scheduledAt.getHours();

      switch (timeSlot.toLowerCase()) {
        case 'morning':
          return hour >= 9 && hour < 12;
        case 'afternoon':
          return hour >= 12 && hour < 15;
        case 'evening':
          return hour >= 15 && hour < 18;
        case 'night':
          return hour >= 18 && hour < 21;
        default:
          return false;
      }
    });

    return slotBookings.length < 5;
  }

  /**
   * Area-based Cost Calculation
   */
  private static calculateAreaCost(area: string): number {
    const areaCosts: Record<string, number> = {
      'Boring Road': 0,
      'Fraser Road': 0,
      'Bailey Road': 0,
      Kankarbagh: 0,
      Kidwaipuri: 0,
      Digha: 50,
      'Patrakar Nagar': 50,
      Patliputra: 50,
      'Rajendra Nagar': 100,
      Danapur: 150,
    };

    return areaCosts[area] || 0;
  }

  /**
   * Analytics and Insights
   */
  static async getBusinessInsights(): Promise<{
    bookingTrends: { month: string; bookings: number; revenue: number }[];
    popularServices: { service: string; bookings: number; rating: number }[];
    customerSatisfaction: {
      average: number;
      distribution: Record<number, number>;
    };
    areaPerformance: { area: string; bookings: number; avgRating: number }[];
  }> {
    await simulateNetworkDelay(500, 800);

    // Mock business insights
    const bookingTrends = [
      { month: '2024-01', bookings: 45, revenue: 67500 },
      { month: '2024-02', bookings: 52, revenue: 78000 },
      { month: '2024-03', bookings: 38, revenue: 57000 },
    ];

    const popularServices = this.services.slice(0, 5).map(service => ({
      service: service.name,
      bookings: Math.floor(Math.random() * 50) + 10,
      rating: parseFloat((4 + Math.random()).toFixed(1)),
    }));

    const customerSatisfaction = {
      average: 4.6,
      distribution: { 1: 2, 2: 3, 3: 8, 4: 25, 5: 62 },
    };

    const areaPerformance = [
      { area: 'Boring Road', bookings: 45, avgRating: 4.7 },
      { area: 'Kankarbagh', bookings: 38, avgRating: 4.5 },
      { area: 'Fraser Road', bookings: 42, avgRating: 4.8 },
      { area: 'Bailey Road', bookings: 35, avgRating: 4.6 },
    ];

    return {
      bookingTrends,
      popularServices,
      customerSatisfaction,
      areaPerformance,
    };
  }

  /**
   * Real-time Updates Simulation
   */
  static subscribeToBookingUpdates(
    callback: (update: {
      type: 'booking_created' | 'booking_updated' | 'technician_assigned';
      data: Appointment;
    }) => void
  ): () => void {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance of update
        const randomAppointment =
          this.appointments[
            Math.floor(Math.random() * this.appointments.length)
          ];

        callback({
          type: 'booking_updated',
          data: randomAppointment,
        });
      }
    }, 10000); // Every 10 seconds

    // Return cleanup function
    return () => clearInterval(interval);
  }

  /**
   * Advanced Search with AI-like suggestions
   */
  static async smartSearch(query: string): Promise<{
    services: Service[];
    suggestions: string[];
    intent:
      | 'service_inquiry'
      | 'booking_intent'
      | 'support_request'
      | 'general';
    confidence: number;
  }> {
    await simulateNetworkDelay(400, 600);

    const queryLower = query.toLowerCase();

    // Simple intent detection
    let intent:
      | 'service_inquiry'
      | 'booking_intent'
      | 'support_request'
      | 'general' = 'general';
    let confidence = 0.7;

    if (
      queryLower.includes('book') ||
      queryLower.includes('appointment') ||
      queryLower.includes('schedule')
    ) {
      intent = 'booking_intent';
      confidence = 0.9;
    } else if (
      queryLower.includes('repair') ||
      queryLower.includes('service') ||
      queryLower.includes('maintenance')
    ) {
      intent = 'service_inquiry';
      confidence = 0.8;
    } else if (
      queryLower.includes('help') ||
      queryLower.includes('support') ||
      queryLower.includes('problem')
    ) {
      intent = 'support_request';
      confidence = 0.8;
    }

    // Search services
    const services = this.services.filter(
      service =>
        service.name.toLowerCase().includes(queryLower) ||
        service.description.toLowerCase().includes(queryLower) ||
        service.features.some(feature =>
          feature.toLowerCase().includes(queryLower)
        )
    );

    // Generate suggestions
    const suggestions = [
      'AC not cooling properly',
      'Emergency AC repair',
      'Annual maintenance contract',
      'Split AC installation',
      'AC cleaning service',
    ].filter(
      suggestion =>
        suggestion.toLowerCase().includes(queryLower) ||
        queryLower
          .split(' ')
          .some(word => suggestion.toLowerCase().includes(word))
    );

    return {
      services: services.slice(0, 5),
      suggestions,
      intent,
      confidence,
    };
  }

  /**
   * Performance Metrics
   */
  static async getPerformanceMetrics(): Promise<{
    responseTime: number;
    uptime: number;
    errorRate: number;
    cacheHitRate: number;
    activeConnections: number;
  }> {
    await simulateNetworkDelay(200, 400);

    return {
      responseTime: Math.floor(Math.random() * 200) + 100, // 100-300ms
      uptime: 99.9,
      errorRate: Math.random() * 0.1, // 0-0.1%
      cacheHitRate: 85 + Math.random() * 10, // 85-95%
      activeConnections: Math.floor(Math.random() * 50) + 10, // 10-60
    };
  }
}

/**
 * Usage Examples and Testing Utilities
 */
export const MockDatabaseExamples = {
  /**
   * Example: Customer booking flow
   */
  async customerBookingFlow() {
    console.log('=== Customer Booking Flow Demo ===');

    // 1. Customer authentication
    try {
      const authState = await MockDatabase.authenticate(
        '+91-9876543201',
        '123456'
      );
      console.log('✅ Authentication successful:', authState.user?.name);
    } catch (error) {
      console.log('❌ Authentication failed:', error);
      return;
    }

    // 2. Search for services
    const services = await MockDatabase.getServices({
      category: 'maintenance',
      limit: 5,
    });
    console.log(`✅ Found ${services.data.length} maintenance services`);

    // 3. Create booking
    if (services.data.length > 0) {
      const bookingRequest: BookingRequest = {
        serviceId: services.data[0].id,
        customer: {
          name: 'John Doe',
          phone: '+91-9876543201',
          email: 'john@email.com',
        },
        preferredDate: '2024-03-15',
        preferredTimeSlot: { start: '10:00', end: '13:00', label: 'Morning' },
        acDetails: {
          brand: 'LG',
          type: 'split',
          capacity: '1.5 Ton',
          age: 2,
          warrantyStatus: 'out_of_warranty',
        },
        address: {
          type: 'home',
          street: '123 Main Street',
          area: 'Boring Road',
          city: 'Patna',
          state: 'Bihar',
          pincode: '800001',
          landmarks: ['Near AIIMS'],
          isDefault: true,
          serviceArea: 'Boring Road',
        },
        urgency: 'normal',
        notes: 'AC not cooling properly',
        source: 'website',
      };

      try {
        const booking = await MockDatabase.createBooking(bookingRequest);
        console.log('✅ Booking created:', booking.confirmationNumber);
        console.log('💰 Estimated cost:', booking.estimatedCost);
      } catch (error) {
        console.log('❌ Booking failed:', error);
      }
    }
  },

  /**
   * Example: Business analytics
   */
  async businessAnalytics() {
    console.log('=== Business Analytics Demo ===');

    const insights = await MockDatabase.getBusinessInsights();
    console.log('📊 Booking trends:', insights.bookingTrends);
    console.log(
      '⭐ Customer satisfaction:',
      insights.customerSatisfaction.average
    );
    console.log('🏆 Top areas:', insights.areaPerformance.slice(0, 3));
  },

  /**
   * Example: Smart search
   */
  async smartSearchDemo() {
    console.log('=== Smart Search Demo ===');

    const queries = [
      'my ac is not cooling',
      'book emergency repair',
      'annual maintenance contract',
      'split ac installation cost',
    ];

    for (const query of queries) {
      const results = await MockDatabase.smartSearch(query);
      console.log(`🔍 "${query}":`, {
        intent: results.intent,
        confidence: results.confidence,
        services: results.services.length,
        suggestions: results.suggestions.length,
      });
    }
  },
};

// Export for testing and demonstration
export default MockDatabase;
