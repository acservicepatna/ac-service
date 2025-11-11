# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AC servicing application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The application serves as a professional AC repair and maintenance service platform for Patna, Bihar, featuring comprehensive service management, booking system, and customer relationship management.

## Development Commands

### Core Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run check-all` - Run type-check, lint, and format:check in sequence

### Quality Assurance

Before committing code, always run:

```bash
npm run check-all
```

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: Version 19 with React Server Components
- **TypeScript**: Strict mode enabled for type safety
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Query (TanStack Query) for server state
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups for booking, services, etc.
│   ├── globals.css        # Global styles and Tailwind imports
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── Navigation/        # Navigation components (Navbar, Breadcrumbs)
│   ├── layouts/           # Layout components (MainLayout)
│   ├── sections/          # Page sections (HeroSection, ContactCTA)
│   ├── services/          # Service-specific components
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks for data fetching
├── lib/                   # Utility libraries and configurations
│   ├── mockData.ts        # Comprehensive mock data
│   ├── mockDatabase.ts    # Mock API simulation
│   ├── providers.tsx      # React Query and other providers
│   └── utils.ts           # Utility functions
├── services/              # API service layers
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

### Key Architectural Patterns

#### 1. Component Organization

- **UI Components**: Located in `src/components/ui/` using shadcn/ui patterns
- **Feature Components**: Organized by domain (Navigation, services, layouts)
- **Section Components**: Reusable page sections in `src/components/sections/`

#### 2. Data Management

- **React Query**: Used for server state management with proper caching
- **Custom Hooks**: Data fetching logic abstracted into hooks (`src/hooks/`)
- **Mock API**: Comprehensive mock database with realistic data simulation

#### 3. Type Safety

- **Comprehensive Types**: All entities defined in `src/types/index.ts`
- **API Response Types**: Standardized `ApiResponse<T>` and `PaginatedResponse<T>`
- **Form Validation**: Typed form states and validation errors

#### 4. Styling System

- **Tailwind CSS**: Utility-first approach with custom CSS variables
- **Component Variants**: Using `class-variance-authority` for component variations
- **Responsive Design**: Mobile-first approach with proper breakpoints

## Mock API System

This project uses a sophisticated mock API system instead of a real backend:

### Mock Data Features

- **14 Services**: Across 5 categories (maintenance, repair, installation, cleaning, emergency)
- **6 Team Members**: Detailed profiles with certifications and specializations
- **8 Customer Testimonials**: Verified reviews with ratings
- **10 Service Areas**: Patna-specific locations with coverage details
- **Complete Type Safety**: All mock data follows TypeScript interfaces

### Mock Database Capabilities

- **Realistic Response Times**: 300-1500ms delays
- **Pagination Support**: All endpoints support pagination
- **Search & Filtering**: Advanced filtering with multiple criteria
- **Booking Availability**: Real-time slot availability checking
- **Smart Technician Assignment**: Based on specialization and location

### Key Mock Services

- `serviceService.ts` - Service management CRUD operations
- `bookingService.ts` - Appointment scheduling and management
- `customerService.ts` - Customer profiles and addresses
- `teamService.ts` - Technician profiles and scheduling
- `testimonialService.ts` - Reviews and feedback management

Refer to `MOCK_API_GUIDE.md` for detailed usage examples and API documentation.

## Component Development Guidelines

### shadcn/ui Integration

The project uses shadcn/ui components configured in `components.json`:

- **Style**: "new-york" variant
- **Base Color**: Blue
- **CSS Variables**: Enabled for theming
- **Path Aliases**: Configured for easy imports

### Component Patterns

1. **UI Components**: Pure, reusable components in `src/components/ui/`
2. **Composed Components**: Business logic components in feature directories
3. **Section Components**: Page-level sections with specific functionality
4. **Layout Components**: Structural components for consistent layouts

### Import Conventions

```typescript
// External libraries
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Internal utilities and types
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

// Components (UI first, then feature components)
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/services/ServiceCard';

// Hooks and services
import { useServices } from '@/hooks';
```

## Development Patterns

### React Query Usage

All API interactions use React Query with custom hooks:

```typescript
// Data fetching
const { data, isLoading, error } = useServices({ page: 1, limit: 10 });

// Mutations
const createBooking = useCreateBooking();
createBooking.mutate(bookingData);
```

### Error Handling

- **API Errors**: Handled through React Query error boundaries
- **Form Validation**: Using typed validation error system
- **User Feedback**: Consistent error messaging across components

### Performance Considerations

- **React 19 Features**: Using latest React features and patterns
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Using Next.js Image component
- **Caching Strategy**: React Query with appropriate stale times

## Local Development Setup

### Prerequisites

- Node.js (recommended version from package.json)
- npm or yarn package manager

### Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open http://localhost:3000 in browser

### Development Workflow

1. Create feature branch
2. Run `npm run check-all` before committing
3. Ensure all TypeScript errors are resolved
4. Follow existing component and naming patterns
5. Update types in `src/types/index.ts` when adding new entities

## SEO and Metadata

The application includes comprehensive SEO setup:

- **Location-based SEO**: Optimized for Patna, Bihar
- **Service-specific Keywords**: AC repair, maintenance, installation
- **Open Graph**: Social media sharing optimization
- **Geo-targeting**: Latitude/longitude for local search

## Deployment Considerations

- **Build Command**: `npm run build`
- **Output**: Static generation where possible, SSR for dynamic content
- **Environment**: Configured for Vercel deployment
- **Performance**: Web Vitals optimization included
