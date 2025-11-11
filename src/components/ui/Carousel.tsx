'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';

type CarouselApi = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  scrollSnapList: number[];
};

type CarouselProps = {
  opts?: {
    align?: 'start' | 'center' | 'end';
    loop?: boolean;
    skipSnaps?: boolean;
    dragFree?: boolean;
    slidesToScroll?: number;
    startIndex?: number;
  };
  plugins?: any[];
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement>;
  api: CarouselApi | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: 'horizontal' | 'vertical';
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [api, setApiState] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const carouselRef = React.useRef<HTMLDivElement>(null);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    // Simple carousel implementation
    React.useEffect(() => {
      if (!carouselRef.current) return;

      const carousel = carouselRef.current;
      let slides: NodeListOf<Element>;
      let currentIndex = 0;

      const updateSlides = () => {
        slides = carousel.querySelectorAll('[data-carousel-item]');
        return slides.length;
      };

      const updateCarouselState = () => {
        const slideCount = updateSlides();
        if (slideCount === 0) return;

        // Calculate visible slides (assuming we show 3 on desktop, 2 on tablet, 1 on mobile)
        const container = carousel.querySelector(
          '[data-carousel-container]'
        ) as HTMLElement;
        if (!container) return;

        const containerWidth = container.parentElement?.offsetWidth || 0;
        let visibleSlides = 1;
        if (containerWidth >= 1024)
          visibleSlides = 3; // lg
        else if (containerWidth >= 768) visibleSlides = 2; // md

        const maxIndex = Math.max(0, slideCount - visibleSlides);
        currentIndex = Math.min(currentIndex, maxIndex);

        // Update transform
        const slideWidth = 100 / visibleSlides;
        const translateX = -currentIndex * slideWidth;
        container.style.transform = `translateX(${translateX}%)`;

        setSelectedIndex(currentIndex);

        // Update scroll capabilities
        const canPrev = opts?.loop
          ? slideCount > visibleSlides
          : currentIndex > 0;
        const canNext = opts?.loop
          ? slideCount > visibleSlides
          : currentIndex < maxIndex;

        setCanScrollPrev(canPrev);
        setCanScrollNext(canNext);

        return { slideCount, visibleSlides, maxIndex, canPrev, canNext };
      };

      const mockApi: CarouselApi = {
        scrollPrev: () => {
          const state = updateCarouselState();
          if (!state) return;

          if (state.canPrev) {
            if (opts?.loop && currentIndex === 0) {
              currentIndex = state.maxIndex;
            } else {
              currentIndex = Math.max(0, currentIndex - 1);
            }
            updateCarouselState();
          }
        },
        scrollNext: () => {
          const state = updateCarouselState();
          if (!state) return;

          if (state.canNext) {
            if (opts?.loop && currentIndex >= state.maxIndex) {
              currentIndex = 0;
            } else {
              currentIndex = Math.min(state.maxIndex, currentIndex + 1);
            }
            updateCarouselState();
          }
        },
        get canScrollPrev() {
          return canScrollPrev;
        },
        get canScrollNext() {
          return canScrollNext;
        },
        scrollTo: (index: number) => {
          const state = updateCarouselState();
          if (!state) return;

          currentIndex = Math.max(0, Math.min(index, state.maxIndex));
          updateCarouselState();
        },
        get selectedIndex() {
          return selectedIndex;
        },
        get scrollSnapList() {
          return Array.from({ length: updateSlides() }, (_, i) => i);
        },
      };

      // Initial setup
      const setupCarousel = () => {
        setApiState(mockApi);
        setApi?.(mockApi);
        updateCarouselState();
      };

      // Set up after a brief delay to ensure DOM is ready
      const timeoutId = setTimeout(setupCarousel, 100);

      // Auto-play functionality
      let autoPlayInterval: NodeJS.Timeout;
      if (opts?.loop) {
        autoPlayInterval = setInterval(() => {
          mockApi.scrollNext();
        }, 5000); // 5 second auto-play
      }

      // Cleanup
      return () => {
        clearTimeout(timeoutId);
        if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
        }
      };
    }, [opts?.loop, setApi, canScrollPrev, canScrollNext, selectedIndex]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={carouselRef}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        data-carousel-container
        className={cn(
          'flex transition-transform duration-300 ease-in-out w-full',
          orientation === 'horizontal' ? '' : 'flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      data-carousel-item
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
