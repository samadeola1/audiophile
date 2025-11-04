"use client";

import React from 'react';
// Import types from react-hook-form
import { useForm, SubmitHandler, FieldError, UseFormRegister, Path } from 'react-hook-form';
import Image from 'next/image';
import { useCartStore } from '../../store/cartStore';

// Define the type for our form data
type FormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: 'eMoney' | 'cash';
  eMoneyNumber?: string;
  eMoneyPin?: string;
};

// --- Helper component for form inputs ---
// We define strict types to fix the 'any' error
interface FormInputProps {
  id: Path<FormInputs>; // This ensures id is a valid key of FormInputs
  label: string;
  register: UseFormRegister<FormInputs>;
  error: FieldError | undefined;
  placeholder: string;
  type?: string;
  className?: string;
}

const FormInput = ({ id, label, register, error, placeholder, type = 'text', className }: FormInputProps) => (
  <div className={`flex-1 ${className}`}>
    <div className="flex justify-between items-center mb-2">
      <label htmlFor={id} className={`font-bold text-xs ${error ? 'text-red-500' : 'text-black'}`}>
        {label}
      </label>
      {error && <span className="text-red-500 text-xs font-medium">{error.message}</span>}
    </div>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      {...register(id, { // We add validation rules here
        required: 'This field is required',
        pattern: {
          value: id === 'email' ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i : 
                 id === 'phone' ? /^[0-9+ -]{7,}$/ :
                 id === 'zip' ? /^[0-9]{5}$/ :
                 id === 'eMoneyNumber' ? /^[0-9]{9}$/ :
                 id === 'eMoneyPin' ? /^[0-9]{4}$/ :
                 /.*/, // Default: any character
          message: id === 'email' ? 'Invalid email format' :
                   id === 'phone' ? 'Invalid phone number' :
                   id === 'zip' ? 'Must be 5 digits' :
                   id === 'eMoneyNumber' ? 'Must be 9 digits' :
                   id === 'eMoneyPin' ? 'Must be 4 digits' :
                   'Invalid format'
        }
      })}
      className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg px-6 py-4 font-bold focus:border-orange-500 outline-none transition-colors`}
      aria-invalid={error ? "true" : "false"}
    />
  </div>
);
// --- End of helper component ---


const CheckoutForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      paymentMethod: 'eMoney', // Default payment method
    }
  });
  const { toggleConfirmationModal } = useCartStore((state) => state.actions);
  
  // Watch the paymentMethod to show/hide eMoney fields
  const paymentMethod = watch('paymentMethod');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Form Data:', data);
    // In a real app, you'd send this data to your Convex backend here.
    
    // Then, open the confirmation modal
    toggleConfirmationModal();
    // Then we clear the cart
  };

  return (
    // We attach the `onSubmit` here and give the form an ID
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* BILLING DETAILS */}
      <fieldset className="mb-8">
        <legend className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4">Billing Details</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="name"
            label="Name"
            register={register}
            error={errors.name}
            placeholder="Alexei Ward"
          />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            register={register}
            error={errors.email}
            placeholder="alexei@mail.com"
          />
          <FormInput
            id="phone"
            label="Phone Number"
            type="tel"
            register={register}
            error={errors.phone}
            placeholder="+1 202-555-0136"
          />
        </div>
      </fieldset>

      {/* SHIPPING INFO */}
      <fieldset className="mb-8">
        <legend className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4">Shipping Info</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="address"
            label="Your Address"
            register={register}
            error={errors.address}
            placeholder="1137 Williams Avenue"
            className="md:col-span-2"
          />
          <FormInput
            id="zip"
            label="ZIP Code"
            register={register}
            error={errors.zip}
            placeholder="10001"
          />
          <FormInput
            id="city"
            label="City"
            register={register}
            error={errors.city}
            placeholder="New York"
          />
          <FormInput
            id="country"
            label="Country"
            register={register}
            error={errors.country}
            placeholder="United States"
          />
        </div>
      </fieldset>

      {/* PAYMENT DETAILS */}
      <fieldset>
        <legend className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4">Payment Details</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="font-bold text-xs md:col-span-1">Payment Method</label>
          <div className="md:col-span-1 space-y-4">
            <label className={`w-full border ${paymentMethod === 'eMoney' ? 'border-orange-500' : 'border-gray-300'} rounded-lg px-6 py-4 font-bold flex items-center gap-4 cursor-pointer`}>
              <input 
                type="radio" 
                value="eMoney" 
                {...register('paymentMethod')} 
                className="accent-orange-500" // Simple style for radio button
              />
              e-Money
            </label>
            <label className={`w-full border ${paymentMethod === 'cash' ? 'border-orange-500' : 'border-gray-300'} rounded-lg px-6 py-4 font-bold flex items-center gap-4 cursor-pointer`}>
              <input 
                type="radio" 
                value="cash" 
                {...register('paymentMethod')} 
                className="accent-orange-500"
              />
              Cash on Delivery
            </label>
          </div>
          
          {paymentMethod === 'eMoney' ? (
            <>
              <FormInput
                id="eMoneyNumber"
                label="e-Money Number"
                register={register}
                error={errors.eMoneyNumber}
                placeholder="238521993"
              />
              <FormInput
                id="eMoneyPin"
                label="e-Money PIN"
                register={register}
                error={errors.eMoneyPin}
                placeholder="6891"
              />
            </>
          ) : (
            <div className="md:col-span-2 flex items-center gap-6 p-4">
              <Image src="/assets/checkout/icon-cash-on-delivery.svg" alt="" width={48} height={48} />
              <p className="text-black text-opacity-50">
                The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
              </p>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default CheckoutForm;