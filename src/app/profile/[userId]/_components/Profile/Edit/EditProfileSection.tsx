import { useToast } from '@/hooks/use-toast';
import EditProfilePic from './EditProfilePic';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Control, useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { profileEditSchema } from '@/server/routers/Schemas/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEditForm } from '@/server/routers/Schemas/schema';
import { trpc } from '@/lib/trpc/client';

export interface EditProfileSectionProps {
  userId: string;
  setIsEditing: (value: boolean) => void;
}

interface ProfileFieldProps {
  name: keyof ProfileEditForm;
  label?: string;
  control: Control<ProfileEditForm>;
  required?: boolean;
  isTextArea?: boolean;
  isSwitch?: boolean;
  helpText?: string;
}

function ProfileField({
  name,
  label,
  control,
  required,
  isTextArea,
  isSwitch,
  helpText,
}: ProfileFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`mb-4 ${isSwitch ? 'flex flex-col space-y-3' : ''}`}
        >
          <FormLabel>
            {label} {required && <span>*</span>}
          </FormLabel>
          <FormControl>
            {isTextArea ? (
              <Textarea
                placeholder={`Your ${label}`}
                className="resize-none border-black"
                {...field}
                value={field.value?.toString() ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value || null);
                }}
              />
            ) : isSwitch ? (
              <Switch
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            ) : (
              <Input
                className="border-black"
                {...field}
                value={field.value?.toString() ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value || null);
                }}
              />
            )}
          </FormControl>
          {helpText && (
            <small className="text-xs text-gray-400">{helpText}</small>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function EditProfileSection({
  userId,
  setIsEditing,
}: EditProfileSectionProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const { data: profile } = trpc.profile.getPublicProfile.useQuery({ userId });

  const form = useForm<ProfileEditForm>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      additionalName: profile?.additionalName ?? '',
      bio: profile?.bio ?? '',
      equipment: profile?.equipment ?? '',
      isContactPublic: profile?.isContactPublic ?? false,
      isPhotographer: profile?.isPhotographer ?? false,
    },
  });

  const updateProfile = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully',
      });
      utils.profile.getPublicProfile.invalidate();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while updating your profile',
      });
    },
  });

  const onSubmit = (values: ProfileEditForm) => {
    updateProfile.mutate({ ...values });
  };

  return (
    <div>
      <h4 className="border-b-2 pb-4 font-bold">Profile</h4>
      <div className="my-3">
        <small className="text-xs">*Indicates Required</small>
      </div>
      <div className="mx-auto sm:mx-0 sm:flex">
        <EditProfilePic
          profileUrl={profile?.profilePic?.url ?? ''}
          profilePicId={profile?.profilePic?.id ?? ''}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 basis-3/4 sm:mt-0 sm:basis-full sm:pl-10 md:space-y-8"
          >
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <ProfileField
                control={form.control}
                name="firstName"
                label="First Name"
                required
              />
              <ProfileField
                control={form.control}
                name="lastName"
                label="Last Name"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <div className="group relative z-0 flex w-full flex-col justify-between md:space-y-8">
                <ProfileField
                  control={form.control}
                  name="additionalName"
                  label="Additional Name"
                />
                <ProfileField
                  control={form.control}
                  name="bio"
                  label="Bio (Please include...)"
                  isTextArea
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <ProfileField
                control={form.control}
                name="equipment"
                label="Equipment"
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-16 lg:gap-32">
              <ProfileField
                control={form.control}
                name="isContactPublic"
                label="Personal Information Public"
                isSwitch
                helpText="By clicking this your information will not be restricted for only UC Davis Student."
              />
              <ProfileField
                control={form.control}
                name="isPhotographer"
                label="Activate Photographer's Account"
                isSwitch
                helpText="Deactivate to return to student account."
              />
            </div>
            <div className="flex justify-end pr-12">
              <Button
                type="submit"
                className="w-20 border border-gray-400 bg-profile_button_bg text-xs text-black hover:bg-primary_blue hover:text-white focus:bg-primary_blue focus:text-white"
                aria-label="Save Profile Section"
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
