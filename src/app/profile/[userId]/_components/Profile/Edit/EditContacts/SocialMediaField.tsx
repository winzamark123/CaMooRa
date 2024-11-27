import { Control } from 'react-hook-form';
import { ContactEditForm } from '@/server/routers/Schemas/schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SocialMediaFieldProps {
  name: keyof ContactEditForm;
  label?: string;
  placeholder?: string;
  control: Control<ContactEditForm>;
  hideLabel?: boolean;
  className?: string;
}

export default function SocialMediaField({
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
