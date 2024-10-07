import { router } from '@/lib/trpc/trpc';
import * as queries from './queries';
import * as mutations from './mutations';
import * as layoutRoutes from './layout';

export const photoAlbum_router = router({
  getAllPhotoAlbums: queries.getAllPhotoAlbums,
  createPhotoAlbum: mutations.createPhotoAlbum,
  updatePhotoAlbumName: mutations.updatePhotoAlbumName,
  deletePhotoAlbum: mutations.deletePhotoAlbum,

  editPhotoAlbumLayout: layoutRoutes.mutations.editPhotoAlbumLayout,
  getPhotoAlbumLayout: layoutRoutes.queries.getPhotoAlbumLayout,
});

export type PhotoAlbumRouter = typeof photoAlbum_router;
