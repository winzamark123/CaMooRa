import React from 'react';
import { useState } from 'react';
import SimpleModal from './ProfilePicPopUp';
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
import { Textarea } from '../ui/textarea';
import UpdateProfilePicForm from './UpdateProfilePicForm';
import Image from 'next/image';

interface ProfileFormValues {
  email?: string;
  discord?: string;
  instagram?: string;
  phone?: string;
  whatsApp?: string;
  portfolio?: string;
  isContactPublic?: boolean;
  isPhotographer?: boolean;
  firstName?: string;
  lastName?: string;
  additionalName?: string;
  equipment?: string;
  bio?: string;
}
export interface ProfileSectionProps {
  form: UseFormReturn<ProfileFormValues, any, undefined>;
  onSave: (values: ProfileFormValues) => void;
  profileUrl: string | undefined;
  profilePicId: string;
}

export default function ProfileSection({
  form,
  onSave,
  profileUrl,
  profilePicId,
}: ProfileSectionProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <div>
      <h4 className="border-b-2 pb-4 font-bold">Profile</h4>
      <div className="my-3">
        <small className="text-xs">*Indicates Required</small>
      </div>
      <div className="mx-auto sm:mx-0 sm:flex">
        <div className="flex basis-1/4 flex-col items-center sm:items-start">
          <SimpleModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <UpdateProfilePicForm
              profilePicUrl={profileUrl}
              profilePicId={profilePicId}
              closeModal={handleCloseModal}
            />
          </SimpleModal>
          <div className="relative mt-2 h-36 w-28 sm:h-40 sm:w-32 md:h-44 md:w-36 lg:h-48 lg:w-40 xl:h-52 xl:w-44">
            <Image
              src={profileUrl ?? ''}
              alt={`Profile Picture`}
              objectFit="cover"
              layout="fill"
              className="rounded-sm border border-black"
            />
          </div>
          <button
            className="mt-3 text-xs underline hover:text-gray-400"
            onClick={handleOpenModal}
            aria-label="Upload Profile Picture"
          >
            Upload Your Profile Picture
          </button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSave)}
            className="mt-5 basis-3/4 sm:mt-0 sm:basis-full sm:pl-10 md:space-y-8"
          >
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mb-4 md:mb-0">
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
                    <FormItem className="mb-4 md:mb-0">
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
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 flex w-full flex-col justify-between md:space-y-8">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mb-4 md:mb-0">
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
                  name="additionalName"
                  render={({ field }) => (
                    <FormItem className="mb-4 md:mb-0">
                      <FormLabel>Additional Name</FormLabel>
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
                    <FormItem className="mb-4 md:mb-0">
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
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="equipment"
                  render={({ field }) => (
                    <FormItem className="mb-4 md:mb-0">
                      <FormLabel>Equipment</FormLabel>
                      <FormControl>
                        <Input className="border-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="isContactPublic"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex flex-col space-y-3">
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
              <div className="group relative z-0 w-full">
                <FormField
                  control={form.control}
                  name="isPhotographer"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex flex-col space-y-3">
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
          </form>
        </Form>
      </div>
    </div>
  );
}
