'use client';

import React from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ServiceCategory, ACType } from '@/types';

export interface FilterOptions {
  searchQuery: string;
  category: ServiceCategory | 'all';
  priceRange: [number, number];
  acTypes: ACType[];
  brands: string[];
  serviceType: 'all' | 'regular' | 'emergency';
  sortBy: 'name' | 'price_low' | 'price_high' | 'duration' | 'popular';
}

interface ServicesFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalResults: number;
  availableBrands: string[];
  className?: string;
}

const categories: {
  value: ServiceCategory | 'all';
  label: string;
  count?: number;
}[] = [
  { value: 'all', label: 'All Services' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'repair', label: 'Repair' },
  { value: 'installation', label: 'Installation' },
  { value: 'emergency', label: 'Emergency' },
];

const acTypes: { value: ACType; label: string }[] = [
  { value: 'window', label: 'Window AC' },
  { value: 'split', label: 'Split AC' },
  { value: 'central', label: 'Central AC' },
  { value: 'cassette', label: 'Cassette AC' },
  { value: 'tower', label: 'Tower AC' },
  { value: 'portable', label: 'Portable AC' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'duration', label: 'Duration' },
];

export default function ServicesFilter({
  filters,
  onFiltersChange,
  totalResults,
  availableBrands,
  className,
}: ServicesFilterProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchQuery: '',
      category: 'all',
      priceRange: [0, 20000],
      acTypes: [],
      brands: [],
      serviceType: 'all',
      sortBy: 'popular',
    });
  };

  const removeACType = (acType: ACType) => {
    updateFilter(
      'acTypes',
      filters.acTypes.filter(type => type !== acType)
    );
  };

  const removeBrand = (brand: string) => {
    updateFilter(
      'brands',
      filters.brands.filter(b => b !== brand)
    );
  };

  const activeFiltersCount = [
    filters.searchQuery !== '',
    filters.category !== 'all',
    filters.acTypes.length > 0,
    filters.brands.length > 0,
    filters.serviceType !== 'all',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 20000,
  ].filter(Boolean).length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search services..."
            value={filters.searchQuery}
            onChange={e => updateFilter('searchQuery', e.target.value)}
            className="pl-10 pr-10"
          />
          {filters.searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Sort */}
        <Select
          value={filters.sortBy}
          onValueChange={value =>
            updateFilter('sortBy', value as FilterOptions['sortBy'])
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Advanced Filters Dialog */}
        <Dialog
          open={showAdvancedFilters}
          onOpenChange={setShowAdvancedFilters}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Filter Services</DialogTitle>
              <DialogDescription>
                Refine your search to find the perfect AC service
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹
                  {filters.priceRange[1].toLocaleString()}
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={value =>
                    updateFilter('priceRange', value as [number, number])
                  }
                  max={20000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹0</span>
                  <span>₹20,000</span>
                </div>
              </div>

              {/* AC Types */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  AC Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {acTypes.map(type => (
                    <Button
                      key={type.value}
                      variant={
                        filters.acTypes.includes(type.value)
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      onClick={() => {
                        const newTypes = filters.acTypes.includes(type.value)
                          ? filters.acTypes.filter(t => t !== type.value)
                          : [...filters.acTypes, type.value];
                        updateFilter('acTypes', newTypes);
                      }}
                      className="justify-start"
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  AC Brands
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {availableBrands.map(brand => (
                    <Button
                      key={brand}
                      variant={
                        filters.brands.includes(brand) ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => {
                        const newBrands = filters.brands.includes(brand)
                          ? filters.brands.filter(b => b !== brand)
                          : [...filters.brands, brand];
                        updateFilter('brands', newBrands);
                      }}
                      className="justify-start text-xs"
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Service Type
                </label>
                <Select
                  value={filters.serviceType}
                  onValueChange={value =>
                    updateFilter(
                      'serviceType',
                      value as FilterOptions['serviceType']
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="regular">Regular Service</SelectItem>
                    <SelectItem value="emergency">Emergency Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All
              </Button>
              <Button onClick={() => setShowAdvancedFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <Tabs
        value={filters.category}
        onValueChange={value =>
          updateFilter('category', value as FilterOptions['category'])
        }
      >
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          {categories.map(category => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="text-xs sm:text-sm"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {filters.searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.searchQuery}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => updateFilter('searchQuery', '')}
              />
            </Badge>
          )}

          {filters.category !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.value === filters.category)?.label}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => updateFilter('category', 'all')}
              />
            </Badge>
          )}

          {filters.acTypes.map(type => (
            <Badge key={type} variant="secondary" className="gap-1">
              {acTypes.find(t => t.value === type)?.label}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeACType(type)}
              />
            </Badge>
          ))}

          {filters.brands.map(brand => (
            <Badge key={brand} variant="secondary" className="gap-1">
              {brand}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeBrand(brand)}
              />
            </Badge>
          ))}

          {filters.serviceType !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {filters.serviceType === 'emergency' ? 'Emergency' : 'Regular'}{' '}
              Service
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => updateFilter('serviceType', 'all')}
              />
            </Badge>
          )}

          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 20000) && (
            <Badge variant="secondary" className="gap-1">
              ₹{filters.priceRange[0].toLocaleString()} - ₹
              {filters.priceRange[1].toLocaleString()}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => updateFilter('priceRange', [0, 20000])}
              />
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>
          {totalResults} service{totalResults !== 1 ? 's' : ''} found
        </span>
        <span>
          Sorted by {sortOptions.find(s => s.value === filters.sortBy)?.label}
        </span>
      </div>
    </div>
  );
}
