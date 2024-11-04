import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export interface ImageProp {
  id: string;
  url: string;
}

export const images_router = router({
  getAllImages: queries.getAllImages,
  getImagesByAlbumId: queries.getImagesByAlbumId,
  updateProfilePic: mutations.updateProfilePic,
  uploadImage: mutations.uploadImage,
  deleteImage: mutations.deleteImage,
});

export type ImageRouter = typeof images_router;
