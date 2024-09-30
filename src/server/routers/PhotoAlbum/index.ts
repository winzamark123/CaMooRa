import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';

export const photoAlbum_router = router({
  getAllPhotoAlbums: queries.getAllPhotoAlbums,
  createPhotoAlbum: mutations.createPhotoAlbum,
  updatePhotoAlbumName: mutations.updatePhotoAlbumName,
  deletePhotoAlbum: mutations.deletePhotoAlbum,
});

export type PhotoAlbumRouter = typeof photoAlbum_router;
