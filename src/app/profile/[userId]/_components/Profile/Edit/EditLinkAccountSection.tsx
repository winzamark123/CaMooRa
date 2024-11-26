import React from 'react';
import { trpc } from '@/lib/trpc/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Control, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactEditSchema,
  ContactEditForm,
} from '@/server/routers/Schemas/schema';

interface EditLinkAccountSectionProps {
  setIsEditing: (value: boolean) => void;
  userId: string;
}

interface SocialMediaFieldProps {
  name: keyof ContactEditForm;
  label?: string;
  placeholder?: string;
  control: Control<ContactEditForm>;
  hideLabel?: boolean;
  className?: string;
}

function SocialMediaField({
  name,
  label,
  placeholder,
  control,
  hideLabel,
  className,
}: SocialMediaFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 flex-grow">
          {!hideLabel && label && <FormLabel>{label}</FormLabel>}
          {hideLabel && <div className="h-6" />}
          <FormControl>
            <Input
              className={`border-black ${className || ''}`}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value || null);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function EditLinkAccountSection({
  setIsEditing,
  userId,
}: EditLinkAccountSectionProps) {
  const { data: contact } = trpc.contact.getContact.useQuery({ userId });

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
    },
  });

  const onSubmit = (values: ContactEditForm) => {
    updateContactMutation.mutate({ ...values });
  };

  return (
    <div>
      <h4 className="mb-5 border-b-2 pb-4 font-bold">Link Account</h4>
      <div className="flex flex-row items-center justify-center">
        <Form {...form}>
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
        </Form>
      </div>
    </div>
  );
}
