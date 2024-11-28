'use client';
import { trpc } from '@/lib/trpc/client';

export default function useFetchProfileInfo({ userId }: { userId: string }) {
  const { data: userProfile, error: userProfileError } =
    trpc.profile.getProfileBasics.useQuery({
      userId,
    });

  const { data: userImage, error: userImageError } =
    trpc.images.getUserHomePageImage.useQuery({
      userId,
    });

  return {
    userProfile,
    userImage,
    userProfileError,
    userImageError,
  };
}
