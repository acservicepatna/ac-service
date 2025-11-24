'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Star, Users, Wrench, Zap } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryIcons = {
  maintenance: Wrench,
  cleaning: Zap,
  repair: Zap,
  installation: Users,
  emergency: Zap,
};

const categoryColors = {
  maintenance: 'bg-blue-50 text-blue-700 border-blue-200',
  cleaning: 'bg-green-50 text-green-700 border-green-200',
  repair: 'bg-orange-50 text-orange-700 border-orange-200',
  installation: 'bg-purple-50 text-purple-700 border-purple-200',
  emergency: 'bg-red-50 text-red-700 border-red-200',
};

export default function ServiceCard({
  service,
  className,
  variant = 'default',
}: ServiceCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const IconComponent = categoryIcons[service.category] || Wrench;

  const isPopular =
    service.category === 'cleaning' || service.category === 'repair';
  const hasDiscount =
    service.price.max && service.price.max > service.price.min * 1.2;

  const renderPrice = () => {
    // Handle services with no fixed price (price.min is 0)
    if (service.price.min === 0) {
      return (
        <div className="text-right">
          <div className="text-xl font-bold text-primary">
            Contact for pricing
          </div>
          <div className="text-sm text-muted-foreground">Quote on inspection</div>
        </div>
      );
    }

    if (service.price.max && service.price.max > service.price.min) {
      return (
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            ₹{service.price.min.toLocaleString()}
            <span className="text-base text-muted-foreground ml-1">
              - ₹{service.price.max.toLocaleString()}
            </span>
          </div>
          {hasDiscount && (
            <div className="text-sm text-green-600 font-medium">
              Save up to ₹
              {(service.price.max - service.price.min).toLocaleString()}
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">
          ₹{service.price.min.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">Starting from</div>
      </div>
    );
  };

  const cardVariants = {
    default: 'hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
    featured:
      'border-primary shadow-lg ring-1 ring-primary/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
    compact: 'hover:shadow-md transition-all duration-200',
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden group',
        cardVariants[variant],
        className
      )}
    >
      {/* Popular Badge */}
      {(isPopular || variant === 'featured') && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge
            variant="destructive"
            className="px-3 py-1 text-xs font-semibold"
          >
            {variant === 'featured' ? 'Featured' : 'Popular'}
          </Badge>
        </div>
      )}

      {/* Emergency Badge */}
      {service.isEmergency && (
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            24/7 Available
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'p-3 rounded-lg border',
                categoryColors[service.category]
              )}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                {service.name}
              </CardTitle>
              <Badge
                variant="outline"
                className={cn('text-xs mt-1', categoryColors[service.category])}
              >
                {service.category.charAt(0).toUpperCase() +
                  service.category.slice(1)}
              </Badge>
            </div>
          </div>
          {renderPrice()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {/* Service Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duration} mins</span>
          </div>
        </div>

        {/* Key Features (limited in card view) */}
        {variant !== 'compact' && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">
              Key Features:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {service.features.length > 3 && (
                <li
                  className="text-primary text-xs font-medium cursor-pointer hover:underline"
                  onClick={() => setShowDetails(true)}
                >
                  +{service.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* AC Types Supported */}
        {variant !== 'compact' && service.availableFor.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Compatible with:
            </h4>
            <div className="flex flex-wrap gap-1">
              {service.availableFor.slice(0, 4).map(acType => (
                <Badge
                  key={acType}
                  variant="secondary"
                  className="text-xs px-2 py-1"
                >
                  {acType.charAt(0).toUpperCase() + acType.slice(1)} AC
                </Badge>
              ))}
              {service.availableFor.length > 4 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  +{service.availableFor.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button
            asChild
            className="flex-1"
            size={variant === 'compact' ? 'sm' : 'default'}
          >
            <Link href={`/booking?service=${service.id}`}>Book Now</Link>
          </Button>

          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size={variant === 'compact' ? 'sm' : 'default'}
                className="px-4"
              >
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg border',
                      categoryColors[service.category]
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {service.name}
                </DialogTitle>
                <DialogDescription>{service.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Pricing Details */}
                <div>
                  <h3 className="font-semibold mb-2">Pricing</h3>
                  {renderPrice()}
                </div>

                {/* Service Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Duration
                    </h4>
                    <p className="text-sm">{service.duration} minutes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Category
                    </h4>
                    <Badge
                      variant="outline"
                      className={categoryColors[service.category]}
                    >
                      {service.category.charAt(0).toUpperCase() +
                        service.category.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Availability
                    </h4>
                    <p className="text-sm">
                      {service.isEmergency ? '24/7 Available' : 'Regular Hours'}
                    </p>
                  </div>
                </div>

                {/* All Features */}
                <div>
                  <h3 className="font-semibold mb-3">All Features Included</h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatible AC Types */}
                <div>
                  <h3 className="font-semibold mb-3">Compatible AC Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.availableFor.map(acType => (
                      <Badge
                        key={acType}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {acType.charAt(0).toUpperCase() + acType.slice(1)} AC
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Book Service Button */}
                <div className="pt-4 border-t">
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/booking?service=${service.id}`}>
                      Book This Service - Starting ₹
                      {service.price.min.toLocaleString()}
                    </Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rating placeholder (for future implementation) */}
        {variant !== 'compact' && (
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              <span>4.8</span>
              <span>(1,200+ bookings)</span>
            </div>
            {service.isEmergency && (
              <span className="text-red-600 font-medium">Same-day service</span>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
