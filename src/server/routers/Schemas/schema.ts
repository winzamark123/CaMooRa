// Create a new file for shared schemas
import { z } from 'zod';

export const profileSchema = z.object({
  userId: z.string(),
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
      message: 'Last Name should not contain numbers or punctuation',
    })
    .optional(),
  additionalName: z
    .string()
    .max(10, { message: 'Additional Name must be 10 characters or less' })
    .optional(),
  profilePicId: z.string().optional(),
  equipment: z
    .string()
    .max(60, { message: 'Equipment must be 60 characters or less' })
    .optional(),
  bio: z
    .string()
    .max(150, { message: 'Bio must be 150 characters or less' })
    .optional(),
});

export const contactSchema = z.object({
  userId: z.string(),
  email: z.string().optional(),
  discord: z.string().optional(),
  instagramTitle: z
    .string()
    .max(15, 'Instagram Title must be 15 characters or less')
    .optional(),
  instagramLink: z.string().optional(),
  phone: z.string().optional(),
  whatsApp: z.string().optional(),
  portfolioTitle: z
    .string()
    .max(15, 'Portfolio Title must be 15 characters or less')
    .optional(),
  portfolioLink: z.string().optional(),
  isContactPublic: z
    .boolean({ invalid_type_error: 'isContactPublic must be a boolean' })
    .optional(),
  isPhotographer: z
    .boolean({ invalid_type_error: 'isPhotographer must be a boolean' })
    .optional(),
});
