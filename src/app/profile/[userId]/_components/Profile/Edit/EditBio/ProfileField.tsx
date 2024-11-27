import { Control } from 'react-hook-form';
import { ProfileEditForm } from '@/server/routers/Schemas/schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface ProfileFieldProps {
  name: keyof ProfileEditForm;
  label?: string;
  control: Control<ProfileEditForm>;
  required?: boolean;
  isTextArea?: boolean;
  isSwitch?: boolean;
  helpText?: string;
}

export default function ProfileField({
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
