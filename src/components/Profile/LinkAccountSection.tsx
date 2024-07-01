import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';

interface ProfileSectionProps {
  form: UseFormReturn<
    {
      email?: string | undefined;
      discord?: string | undefined;
      instagram?: string | undefined;
      phone?: string | undefined;
      whatsApp?: string | undefined;
      isContactPublic?: boolean | undefined;
      isPhotographer?: boolean | undefined;
      firstName?: string | undefined;
      lastName?: string | undefined;
      bio?: string | undefined;
    },
    any,
    undefined
  >;
  onSave: (values: {
    email?: string | undefined;
    discord?: string | undefined;
    instagram?: string | undefined;
    phone?: string | undefined;
    whatsApp?: string | undefined;
    isContactPublic?: boolean | undefined;
    isPhotographer?: boolean | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    bio?: string | undefined;
  }) => void;
}

export default function LinkAccountSection({
  form,
  onSave,
}: ProfileSectionProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="w-full space-y-3 px-7"
        >
          {/* First Row */}
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className=" cursor-not-allowed border-black text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input className="border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Second Row */}
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input className=" border-black " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="whatsApp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input className="border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Third Row */}
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="discord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord</FormLabel>
                    <FormControl>
                      <Input className=" border-black " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className=" cursor-not-allowed border-black text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
