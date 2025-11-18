'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
  open: false,
  setOpen: () => {},
});

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ children, open: controlledOpen, onOpenChange }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);

    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = React.useCallback((newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    }, [onOpenChange]);

    return (
      <SheetContext.Provider value={{ open, setOpen }}>
        <div ref={ref}>{children}</div>
      </SheetContext.Provider>
    );
  }
);

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  }
>(({ className, children, asChild = false, ...props }, ref) => {
  const { setOpen } = React.useContext(SheetContext);
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={cn(className)}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </Comp>
  );
});

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(SheetContext);

    const sideClasses = {
      top: 'inset-x-0 top-0 border-b translate-y-[-100%] data-[state=open]:translate-y-0',
      right:
        'inset-y-0 right-0 border-l translate-x-full data-[state=open]:translate-x-0 w-3/4 sm:max-w-sm',
      bottom:
        'inset-x-0 bottom-0 border-t translate-y-full data-[state=open]:translate-y-0',
      left: 'inset-y-0 left-0 border-r translate-x-[-100%] data-[state=open]:translate-x-0 w-3/4 sm:max-w-sm',
    };

    if (!open) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Sheet content */}
        <div
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          className={cn(
            'fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-hidden flex flex-col',
            sideClasses[side],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
));

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  }
>(({ className, children, asChild = false, ...props }, ref) => {
  const { setOpen } = React.useContext(SheetContext);
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children || (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span className="sr-only">Close</span>
    </Comp>
  );
});

Sheet.displayName = 'Sheet';
SheetTrigger.displayName = 'SheetTrigger';
SheetContent.displayName = 'SheetContent';
SheetHeader.displayName = 'SheetHeader';
SheetTitle.displayName = 'SheetTitle';
SheetDescription.displayName = 'SheetDescription';
SheetClose.displayName = 'SheetClose';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
