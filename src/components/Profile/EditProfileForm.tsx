import { trpc } from '@/lib/trpc/client';
import { Dispatch, SetStateAction } from 'react';
import { ContactProps, ProfileProps } from './Profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface EditProfileFormProps {
  profile: ProfileProps;
  contact: ContactProps;
  clerkId: string;
  refetchProfile: () => void;
  refetchContact: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

interface UpdateProfileVariableProps {
  clerkId: string;
  firstName?: string;
  lastName?: string;
}

interface UpdateContactVariableProps {
  clerkId: string;
  discord?: string | '';
  instagram?: string | '';
  phone?: string | '';
  whatsApp?: string | '';
  isContactPublic?: boolean;
  isPhotographer?: boolean;
}

export default function EditProfileForm({
  contact,
  profile,
  clerkId,
  refetchProfile,
  refetchContact,
  setIsEditing,
}: EditProfileFormProps) {
  // Calling TRPC update procedures
  const updateProfile = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      console.log('Profile fields updated successfully');
      refetchProfile();
    },
    onError: (err) => {
      console.error('Error updating Profile fields ', err);
    },
  });

  const updateContact = trpc.contact.updateContact.useMutation({
    onSuccess: () => {
      console.log('Contact fields updated successfully');
      refetchContact();
    },
    onError: (err) => {
      console.error('Error updating Contact fields', err);
    },
  });

  // Form validation
  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: 'First Name required' })
      .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
        message: 'First Name should not contain numbers or punctuation',
      })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: 'Last Name required' })
      .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
        message: 'Last Name should not contain numbers',
      })
      .optional(),
    email: z.string().optional(),
    discord: z.string().optional(),
    instagram: z.string().optional(),
    phone: z.string().optional(),
    whatsApp: z.string().optional(),
    isContactPublic: z
      .boolean({ invalid_type_error: 'isContactPublic must be a boolean' })
      .optional(),
    isPhotographer: z
      .boolean({ invalid_type_error: 'isPhotographer must be a boolean' })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: contact.email,
      phone: contact.phone || '',
      whatsApp: contact.whatsApp || '',
      instagram: contact.instagram || '',
      discord: contact.discord || '',
      isContactPublic: contact.isContactPublic,
      isPhotographer: contact.isPhotographer,
    },
  });

  function onSave(values: z.infer<typeof formSchema>) {
    // Cut white spaces off inputs
    const trimmedFirstName = values.firstName?.trim();
    const trimmedLastName = values.lastName?.trim();
    const trimmedDiscordLink = values.discord?.trim();
    const trimmedInstagramLink = values.instagram?.trim();
    const trimmedWhatsAppLink = values.whatsApp?.trim();
    const trimmedPhone = values.phone?.trim();

    // Checks Profile fields (checks if state variable doesn't equal saved variable in db)
    const updatedProfileData: UpdateProfileVariableProps = { clerkId };
    if (trimmedFirstName !== profile.firstName)
      updatedProfileData.firstName = trimmedFirstName;
    if (trimmedLastName !== profile.lastName)
      updatedProfileData.lastName = trimmedLastName;

    // Checks Contact fields (checks if state variable doesn't equal saved variable in db)
    const updatedContactData: UpdateContactVariableProps = { clerkId };
    if (values.isContactPublic !== contact.isContactPublic)
      updatedContactData.isContactPublic = values.isContactPublic;
    if (values.isPhotographer !== contact.isPhotographer)
      updatedContactData.isPhotographer = values.isPhotographer;
    if (trimmedDiscordLink !== contact.discord)
      updatedContactData.discord = values.discord;
    if (trimmedInstagramLink !== contact.instagram)
      updatedContactData.instagram = values.instagram;
    if (trimmedPhone !== contact.phone) updatedContactData.phone = values.phone;
    if (trimmedWhatsAppLink !== contact.whatsApp)
      updatedContactData.whatsApp = values.whatsApp;

    // Update Profile and Contact fields
    if (Object.keys(updatedProfileData).length > 1) {
      updateProfile.mutate(updatedProfileData);
    }
    if (Object.keys(updatedContactData).length > 1) {
      updateContact.mutate(updatedContactData);
    }
  }

  return (
    <div className="flex flex-row items-center justify-between border-b-2 border-t-2 py-4 ">
      <div className="basis-1/4">Avatar</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="basis-3/4 space-y-3 px-7"
        >
          <div className="grid md:grid-cols-2 md:gap-32">
            <div className="group relative z-0 mb-5 w-full">
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
            <div className="group relative z-0 mb-5 w-full">
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
            </div>
          </div>
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
                name="isContactPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-black p-3">
                    <FormLabel>Contact Public </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPhotographer"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-row items-center justify-between rounded-lg border border-black p-3">
                    <FormLabel>Photographer </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </form>
      </Form>
    </div>
  );
}
