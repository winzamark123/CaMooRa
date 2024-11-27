// Create a new file for shared schemas
import { z } from 'zod';
import type { Profile, Contact } from '@prisma/client';

const profileSchema = z.object({
  userId: z.string(),
  firstName: z
    .string()
    .min(1, { message: 'First Name required' })
    .transform((value) => value.trim())
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: 'First Name should not contain numbers or punctuation',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last Name required' })
    .transform((value) => value.trim())
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: 'Last Name should not contain numbers or punctuation',
    })
    .nullable(),
  additionalName: z
    .string()
    .max(10, { message: 'Additional Name must be 10 characters or less' })
    .nullable(),
  profilePicId: z.string(),
  equipment: z
    .string()
    .max(60, { message: 'Equipment must be 60 characters or less' })
    .nullable(),
  bio: z
    .string()
    .max(150, { message: 'Bio must be 150 characters or less' })
    .nullable(),
  isContactPublic: z.boolean({
    invalid_type_error: 'isContactPublic must be a boolean',
  }),
  isPhotographer: z.boolean({
    invalid_type_error: 'isPhotographer must be a boolean',
  }),
}) satisfies z.ZodType<Profile>;

// Base contact schema (for full type)
const contactSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  discord: z
    .string()
    .nullable()
    .transform((value) => (value ? value.trim() : null)),
  phone: z.string().nullable(),
  whatsApp: z.string().nullable(),
  instagramTitle: z
    .string()
    .max(30, 'Instagram Title must be 30 characters or less')
    .transform((value) => (value ? value.trim() : null))
    .nullable(),
  instagramLink: z.string().url('Must be a valid URL').nullable(),
  portfolioTitle: z
    .string()
    .max(30, 'Portfolio Title must be 30 characters or less')
    .nullable(),
  portfolioLink: z.string().url('Must be a valid URL').nullable(),
}) satisfies z.ZodType<Contact>;

// Edit schema (for updates)
export const contactEditSchema = contactSchema.omit({
  userId: true,
  email: true,
});

export const profileEditSchema = profileSchema.omit({
  userId: true,
  profilePicId: true,
});

// Type for the edit form
export type ContactEditForm = z.infer<typeof contactEditSchema>;
export type ProfileEditForm = z.infer<typeof profileEditSchema>;
