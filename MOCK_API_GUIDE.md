# Mock API Store Guide

This comprehensive mock API store provides realistic data and functionality for the AC servicing application with proper pagination, caching, error handling, and React Query integration.

## 🚀 Features Implemented

### 1. **Mock Data Store** (`src/lib/mockData.ts`)

- ✅ Complete service catalog (14 services) with realistic pricing and descriptions
- ✅ Team member profiles with experience, certifications, and photos
- ✅ Customer testimonials with ratings and verified reviews (8 testimonials)
- ✅ Available time slots and booking data
- ✅ Patna-specific service areas with coverage details (10 areas)
- ✅ AC brands and models database (10 brands, 50+ models)
- ✅ Emergency service data with response times

### 2. **API Services** (`src/services/` directory)

- ✅ **Service Management** (`serviceService.ts`) - Complete CRUD operations
- ✅ **Booking System** (`bookingService.ts`) - Appointment scheduling & management
- ✅ **Customer Management** (`customerService.ts`) - Customer profiles & addresses
- ✅ **Team Management** (`teamService.ts`) - Technician profiles & scheduling
- ✅ **Testimonials** (`testimonialService.ts`) - Reviews & feedback management
- ✅ Mock API responses with proper error handling

### 3. **React Query Setup**

- ✅ **Query Client** (`src/lib/queryClient.ts`) - Configured with caching & error handling
- ✅ **Providers** (`src/lib/providers.tsx`) - React Query provider setup
- ✅ **Custom Hooks** (`src/hooks/`) - Type-safe data fetching hooks
- ✅ Caching strategies and error handling
- ✅ Mutation functions for all operations

### 4. **Mock Database Simulation** (`src/lib/mockDatabase.ts`)

- ✅ Realistic response times (300-1500ms)
- ✅ Pagination for all endpoints
- ✅ Search and filtering capabilities
- ✅ Mock authentication states
- ✅ Booking availability checking
- ✅ Smart technician assignment
- ✅ Business analytics and insights

## 📁 Project Structure

```
src/
├── lib/
│   ├── mockData.ts          # Comprehensive mock data
│   ├── mockDatabase.ts      # Database simulation with advanced features
│   ├── queryClient.ts       # React Query configuration
│   └── providers.tsx        # Application providers
├── services/
│   ├── api.ts               # Base API configuration
│   ├── serviceService.ts    # Service management APIs
│   ├── bookingService.ts    # Booking system APIs
│   ├── customerService.ts   # Customer management APIs
│   ├── teamService.ts       # Technician management APIs
│   ├── testimonialService.ts# Review management APIs
│   └── index.ts             # Service exports
├── hooks/
│   ├── useServices.ts       # Service-related hooks
│   ├── useBookings.ts       # Booking-related hooks
│   ├── useCustomers.ts      # Customer-related hooks
│   ├── useTechnicians.ts    # Technician-related hooks
│   ├── useTestimonials.ts   # Testimonial-related hooks
│   └── index.ts             # Hook exports
└── types/
    └── index.ts             # TypeScript definitions
```

## 🛠 Usage Examples

### Basic Service Fetching

```tsx
import { useServices } from '@/hooks';

function ServicesPage() {
  const { data, isLoading, error } = useServices({
    page: 1,
    limit: 10,
    filters: { category: 'maintenance' },
  });

  if (isLoading) return <div>Loading services...</div>;
  if (error) return <div>Error loading services</div>;

  return (
    <div>
      {data?.data.map(service => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>₹{service.price.min}</p>
        </div>
      ))}
    </div>
  );
}
```

### Creating a Booking

```tsx
import { useCreateBooking } from '@/hooks';

function BookingForm() {
  const createBooking = useCreateBooking();

  const handleSubmit = formData => {
    createBooking.mutate({
      serviceId: 'srv_1',
      customer: {
        name: 'John Doe',
        phone: '+91-9876543210',
        email: 'john@example.com',
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
        isDefault: true,
        serviceArea: 'Boring Road',
      },
      urgency: 'normal',
      source: 'website',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={createBooking.isPending}>
        {createBooking.isPending ? 'Booking...' : 'Book Service'}
      </button>
    </form>
  );
}
```

### Advanced Filtering and Search

```tsx
import { useServices, useServiceSearch } from '@/hooks';

function ServiceSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'maintenance',
    minPrice: 500,
    maxPrice: 2000,
    acType: 'split',
  });

  const servicesQuery = useServices({
    filters,
    sortBy: 'price',
    sortOrder: 'asc',
  });

  const searchQuery = useServiceSearch(searchQuery, 10, !!searchQuery);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search services..."
      />

      {/* Filter UI */}

      {searchQuery ? searchQuery.data : servicesQuery.data}
    </div>
  );
}
```

### Checking Availability

```tsx
import { useAvailabilityCheck } from '@/hooks';

function AvailabilityChecker() {
  const availability = useAvailabilityCheck({
    date: '2024-03-15',
    serviceArea: 'Boring Road',
    isEmergency: false,
    duration: 90,
  });

  if (availability.isLoading) return <div>Checking availability...</div>;

  return (
    <div>
      {availability.data?.data?.timeSlots.map(slot => (
        <div key={slot.label}>
          <span>
            {slot.label} ({slot.start} - {slot.end})
          </span>
          <span className={slot.available ? 'text-green-600' : 'text-red-600'}>
            {slot.available ? 'Available' : 'Booked'}
          </span>
        </div>
      ))}
    </div>
  );
}
```

## 🎯 Key Features

### 1. **Realistic Data**

- **Services**: 14 comprehensive services covering maintenance, repair, installation, cleaning, and emergency
- **Team Members**: 6 detailed profiles with certifications and specializations
- **Testimonials**: 8 verified customer reviews with ratings and comments
- **Service Areas**: 10 Patna locations with coverage details and pricing
- **AC Database**: 10+ brands with specific models and compatibility

### 2. **Smart Features**

- **Availability Checking**: Real-time slot availability with conflict detection
- **Technician Assignment**: Automatic assignment based on specialization, location, and rating
- **Dynamic Pricing**: Area-based and urgency-based cost calculations
- **Search & Filtering**: Advanced filtering with multiple criteria
- **Caching Strategy**: Intelligent caching with different TTLs for different data types

### 3. **Business Logic**

- **Booking Workflow**: Complete customer journey from service selection to confirmation
- **Authentication**: Mock OTP-based authentication system
- **Analytics**: Business insights with booking trends and performance metrics
- **Real-time Updates**: Simulated real-time booking status updates

### 4. **Developer Experience**

- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Proper error boundaries and user-friendly error messages
- **Performance**: Optimized queries with pagination and lazy loading
- **Testing Ready**: Mock functions perfect for unit and integration testing

## 🧪 Testing the Mock API

Run the mock database examples:

```typescript
import { MockDatabaseExamples } from '@/lib/mockDatabase';

// Test customer booking flow
await MockDatabaseExamples.customerBookingFlow();

// Test business analytics
await MockDatabaseExamples.businessAnalytics();

// Test smart search
await MockDatabaseExamples.smartSearchDemo();
```

## 🚀 Getting Started

1. **Install Dependencies** ✅

   ```bash
   npm install @tanstack/react-query
   ```

2. **Provider Setup** ✅
   The React Query provider is already configured in your root layout.

3. **Use Hooks in Components**

   ```tsx
   import { useServices, useCreateBooking } from '@/hooks';
   ```

4. **Customize Mock Data**
   Edit `src/lib/mockData.ts` to add more services, customers, or testimonials.

## 📊 Mock Data Statistics

- **Services**: 14 services across 5 categories
- **Customers**: 3 sample customers with full profiles
- **Appointments**: 2 sample bookings with different statuses
- **Technicians**: 4 detailed technician profiles
- **Team Members**: 6 team member profiles
- **Testimonials**: 8 verified customer reviews
- **Service Areas**: 10 Patna locations with coverage details
- **Time Slots**: 4 regular + 7 emergency time slots

## 🔄 Real-time Features

- **Live Availability**: Updates every minute
- **Booking Status**: Real-time status changes
- **Technician Tracking**: Live location and status updates
- **Performance Metrics**: Real-time system health monitoring

This mock API store provides everything you need to build and test your AC servicing application with realistic data and proper pagination, caching, and error handling!
