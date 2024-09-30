import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutation';

export interface ImageProp {
  id: string;
  url: string;
  imgWidth: number | null;
  imgHeight: number | null;
}

export const images_router = router({
  getAllImages: queries.getAllImages,
  updateProfilePic: mutations.updateProfilePic,
  uploadImage: mutations.uploadImage,
  deleteImage: mutations.deleteImage,
});

export type ImageRouter = typeof images_router;
