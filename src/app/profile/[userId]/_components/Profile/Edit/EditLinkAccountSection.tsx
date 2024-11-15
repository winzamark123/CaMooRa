import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../../components/ui/form';
import { Input } from '../../../../../../components/ui/input';
import { EditProfileSectionProps } from './EditProfileSection';
import { Button } from '@/components/ui/button';

type EditLinkAccountSectionProps = Omit<
  EditProfileSectionProps,
  'profileUrl' | 'profilePicId'
>;

export default function EditLinkAccountSection({
  form,
  onSave,
  setIsEditing,
}: EditLinkAccountSectionProps) {
  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-bold">Link Account</h4>
      <div className="flex flex-row items-center justify-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              onSave(values);
              setIsEditing(false);
            })}
            className="w-full basis-full sm:basis-11/12 md:space-y-3"
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
              <div className="group relative z-0 flex w-full flex-grow">
                <FormField
                  control={form.control}
                  name="instagramTitle"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-grow">
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-e-none border-black "
                          placeholder="Instagram Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagramLink"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-grow">
                      <div className="h-6"></div>
                      <FormControl>
                        <Input
                          className="rounded-s-none border-l-0 border-black "
                          placeholder="Instagram Link"
                          {...field}
                        />
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
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="portfolioTitle"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-grow">
                      <FormLabel>Portfolio</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-e-none border-black "
                          placeholder="Portfolio Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolioLink"
                  render={({ field }) => (
                    <FormItem className="mb-4 flex-grow">
                      <div className="h-6"></div>
                      <FormControl>
                        <Input
                          className="rounded-s-none border-l-0 border-black "
                          placeholder="Portfolio Link"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                className="w-20 border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue focus:text-white"
                aria-label="Save Link Account Section"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
