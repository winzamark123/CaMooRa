import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { trpc } from '@/lib/trpc/client';
import SocialMediaField from './SocialMediaField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactEditSchema,
  ContactEditForm,
} from '@/server/routers/Schemas/schema';

interface EditContactsProps {
  setIsEditing: (value: boolean) => void;
  userId: string;
}

export default function EditContacts({
  setIsEditing,
  userId,
}: EditContactsProps) {
  const { data: contact } = trpc.contact.getContact.useQuery({ userId });
  const { toast } = useToast();

  const form = useForm<ContactEditForm>({
    resolver: zodResolver(contactEditSchema),
    defaultValues: {
      discord: contact?.discord ?? null,
      phone: contact?.phone ?? null,
      whatsApp: contact?.whatsApp ?? null,
      instagramTitle: contact?.instagramTitle ?? null,
      instagramLink: contact?.instagramLink ?? null,
      portfolioTitle: contact?.portfolioTitle ?? null,
      portfolioLink: contact?.portfolioLink ?? null,
    },
  });

  const updateContactMutation = trpc.contact.updateContact.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      toast({
        title: 'Contact Updated!',
        description: 'Your contact has been updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while updating your contact',
      });
    },
  });

  const onSubmit = (values: ContactEditForm) => {
    updateContactMutation.mutate({ ...values });
  };

  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-bold">Link Account</h4>
      <div className="flex flex-row items-center justify-center">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full basis-full sm:basis-11/12 md:space-y-3"
          >
            {/* First Row */}
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Email <span>*</span>
                  </label>
                  <Input
                    readOnly
                    value={contact?.email || ''}
                    className="cursor-not-allowed border-black text-gray-400"
                  />
                </div>
              </div>
              <div className="group relative z-0 flex w-full flex-grow">
                <SocialMediaField
                  control={form.control}
                  name="instagramTitle"
                  label="Instagram"
                  placeholder="Instagram Title"
                  className="rounded-e-none"
                />
                <SocialMediaField
                  control={form.control}
                  name="instagramLink"
                  placeholder="Instagram Link"
                  hideLabel
                  className="rounded-s-none border-l-0"
                />
              </div>
            </div>
            {/* Second Row */}
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 w-full">
                <SocialMediaField
                  control={form.control}
                  name="discord"
                  label="Discord"
                />
              </div>
              <div className="group relative z-0 w-full">
                <SocialMediaField
                  control={form.control}
                  name="whatsApp"
                  label="WhatsApp"
                />
              </div>
            </div>
            {/* Third Row */}
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="flex w-full">
                <SocialMediaField
                  control={form.control}
                  name="portfolioTitle"
                  label="Portfolio"
                  placeholder="Portfolio Title"
                  className="rounded-e-none"
                />
                <SocialMediaField
                  control={form.control}
                  name="portfolioLink"
                  placeholder="Portfolio Link"
                  hideLabel
                  className="rounded-s-none border-l-0"
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
        </FormProvider>
      </div>
    </div>
  );
}
