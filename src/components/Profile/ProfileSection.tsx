import Image from 'next/image';
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
import { Switch } from '../ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

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
  profileUrl: string | undefined;
}

export default function ProfileSection({
  form,
  onSave,
  profileUrl,
}: ProfileSectionProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="basis-1/4">
        {profileUrl && (
          <Image src={profileUrl} alt="profile" width={233} height={289} />
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="basis-3/4 space-y-8 px-7"
        >
          {/* 1st Row */}
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="group relative z-0 w-full">
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
          {/* 2nd Row */}
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 flex w-full flex-col justify-between space-y-5">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="border-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <div className="group relative z-0 w-full">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your Bio"
                        className="resize-none border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* 3rd Row */}
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="isContactPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Personal Information Public</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        isPublic={true}
                      />
                    </FormControl>
                    <small className="text-xs text-gray-400">
                      By clicking this your information will not be restricted
                      for only UC Davis Student.
                    </small>
                  </FormItem>
                )}
              />
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <FormField
                control={form.control}
                name="isPhotographer"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Activate Photographer’s Account</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <small className="text-xs text-gray-400">
                      Deactivate to return to student account.
                    </small>
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
