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
import { ProfileSectionProps } from './ProfileSection';

type LinkAccountSectionProps = Omit<
  ProfileSectionProps,
  'profileUrl' | 'profilePicId'
>;

export default function LinkAccountSection({
  form,
  onSave,
}: LinkAccountSectionProps) {
  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-bold">Link Account</h4>
      <div className="flex flex-row items-center justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSave)}
            className="w-full basis-11/12 md:space-y-3"
          >
            {/* First Row */}
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
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
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input className=" border-black " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Second Row */}
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="discord"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Discord</FormLabel>
                      <FormControl>
                        <Input className=" border-black " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="whatsApp"
                  render={({ field }) => (
                    <FormItem className="mb-4">
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
            {/* <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="discord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Link</FormLabel>
                    <FormControl>
                      <Input className=" border-black " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> */}
          </form>
        </Form>
      </div>
    </div>
  );
}
