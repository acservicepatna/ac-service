'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/Sheet';
import { PATNA_SERVICE_AREAS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  detailedQuoteSchema,
  FIELD_CONFIGS,
  SERVICE_OPTIONS,
  URGENCY_OPTIONS,
  FORM_STEPS,
  formatPhoneNumber,
  type DetailedQuoteForm,
  type FormStep,
} from '@/lib/form-validation';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Settings,
  Clock,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Edit,
  Star,
  Zap,
  Shield
} from 'lucide-react';

interface TwoStepQuoteWidgetProps {
  prefillService?: string;
  prefillArea?: string;
  className?: string;
}

const iconMap = {
  User,
  Phone,
  Mail,
  MapPin,
  Settings,
  Clock,
  MessageCircle,
};

// Step 1: Details Collection Form
function DetailsStep({
  form,
  onNext,
  shouldReduceMotion,
}: {
  form: any;
  onNext: () => void;
  shouldReduceMotion: boolean;
}) {
  const { register, formState: { errors }, watch, setValue } = form;
  const watchedValues = watch();

  // Phone number formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const renderField = (fieldName: keyof DetailedQuoteForm, index: number) => {
    const config = FIELD_CONFIGS[fieldName];
    const IconComponent = iconMap[config.icon as keyof typeof iconMap];
    const error = errors[fieldName];
    const value = watchedValues[fieldName];
    const isValid = value && !error;

    return (
      <motion.div
        key={fieldName}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.3,
          delay: shouldReduceMotion ? 0 : index * 0.1
        }}
        className="space-y-2"
      >
        <label htmlFor={fieldName} className="block text-sm font-semibold text-gray-700">
          {config.label}
        </label>

        <div className="relative">
          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

          {config.type === 'select' ? (
            <select
              {...register(fieldName)}
              id={fieldName}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200",
                "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white",
                error
                  ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                  : isValid
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300"
              )}
            >
              <option value="">{config.placeholder}</option>
              {fieldName === 'service' && SERVICE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.price}
                </option>
              ))}
              {fieldName === 'area' && PATNA_SERVICE_AREAS.map(area => (
                <option key={area.name} value={area.name}>
                  {area.name} ({area.pincode})
                </option>
              ))}
              {fieldName === 'urgency' && URGENCY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.extra}
                </option>
              ))}
            </select>
          ) : config.type === 'textarea' ? (
            <textarea
              {...register(fieldName)}
              id={fieldName}
              rows={3}
              placeholder={config.placeholder}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200",
                "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                "placeholder:text-gray-400 resize-none",
                error
                  ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                  : isValid
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-white"
              )}
            />
          ) : (
            <input
              {...register(fieldName)}
              type={config.type}
              id={fieldName}
              placeholder={config.placeholder}
              onChange={fieldName === 'phone' ? handlePhoneChange : undefined}
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200",
                "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                "placeholder:text-gray-400",
                error
                  ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                  : isValid
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-white"
              )}
            />
          )}

          {/* Validation indicator */}
          <div className="absolute right-3 top-3">
            {isValid && <CheckCircle className="h-5 w-5 text-green-500" />}
            {error && <AlertCircle className="h-5 w-5 text-red-500" />}
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="h-4 w-4" />
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {renderField('name', 0)}
        {renderField('phone', 1)}
        {renderField('email', 2)}
        {renderField('address', 3)}
        {renderField('service', 4)}
        {renderField('area', 5)}
        {renderField('urgency', 6)}
        {renderField('description', 7)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="pt-4 border-t border-gray-100"
      >
        <Button
          type="button"
          onClick={onNext}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 text-lg"
        >
          Review & Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

// Step 2: Confirmation & Summary
function ConfirmationStep({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
  shouldReduceMotion,
}: {
  formData: DetailedQuoteForm;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  shouldReduceMotion: boolean;
}) {
  const selectedService = SERVICE_OPTIONS.find(s => s.value === formData.service);
  const selectedUrgency = URGENCY_OPTIONS.find(u => u.value === formData.urgency);

  const summaryItems = [
    { label: 'Name', value: formData.name, icon: User },
    { label: 'Phone', value: formData.phone, icon: Phone },
    { label: 'Email', value: formData.email || 'Not provided', icon: Mail },
    { label: 'Address', value: formData.address, icon: MapPin },
    {
      label: 'Service',
      value: selectedService ? `${selectedService.label} (${selectedService.price})` : formData.service,
      icon: Settings
    },
    { label: 'Area', value: formData.area, icon: MapPin },
    {
      label: 'Timing',
      value: selectedUrgency ? `${selectedUrgency.label} - ${selectedUrgency.extra}` : formData.urgency,
      icon: Clock
    },
    { label: 'Details', value: formData.description || 'No additional details', icon: MessageCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pb-6 border-b border-gray-100"
      >
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your Request</h3>
        <p className="text-gray-600">Please confirm your details before submitting</p>
      </motion.div>

      {/* Summary Items */}
      <div className="space-y-4">
        {summaryItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : index * 0.05,
                duration: shouldReduceMotion ? 0.1 : 0.3
              }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-sm text-gray-900 break-words">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Price Estimate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-700">Estimated Cost</p>
            <p className="text-lg font-bold text-indigo-900">{selectedService?.price || 'Custom Quote'}</p>
          </div>
          <Star className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-xs text-indigo-600 mt-2">Final price will be confirmed after inspection</p>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 py-3"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit Details
        </Button>

        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
        >
          {isSubmitting ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Submitting...
            </motion.div>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm & Submit
            </>
          )}
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-green-600" />
          <span>Secure & Private</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-blue-600" />
          <span>Quick Response</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-indigo-600" />
          <span>No Spam Calls</span>
        </div>
      </div>
    </div>
  );
}

// Main Two-Step Quote Widget Component
export function TwoStepQuoteWidget({
  prefillService,
  prefillArea,
  className,
}: TwoStepQuoteWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>(FORM_STEPS.DETAILS);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const form = useForm<DetailedQuoteForm>({
    resolver: zodResolver(detailedQuoteSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      service: prefillService || '',
      area: prefillArea || '',
      urgency: '',
      description: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    getValues,
    setValue,
    reset,
  } = form;

  // Prefetch booking route
  useEffect(() => {
    router.prefetch('/booking');
  }, [router]);

  // Handle prefill values
  useEffect(() => {
    if (prefillService) {
      setValue('service', prefillService, { shouldValidate: true });
    }
    if (prefillArea) {
      setValue('area', prefillArea, { shouldValidate: true });
    }
  }, [prefillService, prefillArea, setValue]);

  const handleNext = () => {
    const requiredFields: (keyof DetailedQuoteForm)[] = ['name', 'phone', 'address', 'service', 'area', 'urgency'];
    const currentValues = getValues();

    // Check if required fields are filled and valid
    const hasErrors = requiredFields.some(field => errors[field] || !currentValues[field]);

    if (hasErrors) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setCurrentStep(FORM_STEPS.CONFIRMATION);
  };

  const handleBack = () => {
    setCurrentStep(FORM_STEPS.DETAILS);
  };

  const onSubmit = async () => {
    try {
      const loadingToast = toast.loading('Submitting your quote request...');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.dismiss(loadingToast);
      toast.success('Quote request submitted successfully! 🎉', { duration: 4000 });

      const formData = getValues();
      const params = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        service: formData.service,
        area: formData.area,
        urgency: formData.urgency,
        quoteRequest: 'true'
      });

      router.push(`/booking?${params.toString()}`);

      // Reset and close
      reset();
      setCurrentStep(FORM_STEPS.DETAILS);
      setIsOpen(false);

    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={className}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="w-full">
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02, y: shouldReduceMotion ? 0 : -2 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Detailed Quote</h3>
                <p className="text-gray-600 mb-4">Complete assessment with instant pricing</p>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  Start Quote Process
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Detailed service assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Transparent pricing breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Flexible scheduling options</span>
                </div>
              </div>
            </motion.div>
          </div>
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:max-w-lg bg-white overflow-y-auto">
          <SheetHeader className="text-left pb-6 border-b border-gray-100">
            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
              {currentStep === FORM_STEPS.DETAILS ? 'Service Details' : 'Review & Confirm'}
            </SheetTitle>
            <SheetDescription className="text-gray-600">
              {currentStep === FORM_STEPS.DETAILS
                ? 'Fill in your details for a comprehensive service quote'
                : 'Please review your information before submitting'
              }
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStep === FORM_STEPS.DETAILS && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
                  >
                    <DetailsStep
                      form={form}
                      onNext={handleNext}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </motion.div>
                )}

                {currentStep === FORM_STEPS.CONFIRMATION && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
                  >
                    <ConfirmationStep
                      formData={getValues()}
                      onBack={handleBack}
                      onSubmit={onSubmit}
                      isSubmitting={isSubmitting}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <SheetClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}