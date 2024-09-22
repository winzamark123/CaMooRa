/*
  Warnings:

  - A unique constraint covering the columns `[clerkId,photoAlbumName]` on the table `PhotoAlbum` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PhotoAlbum_clerkId_photoAlbumName_key" ON "PhotoAlbum"("clerkId", "photoAlbumName");
