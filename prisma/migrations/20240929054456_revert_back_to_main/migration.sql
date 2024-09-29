/*
  Warnings:

  - You are about to drop the column `MosaicLayout` on the `PhotoAlbum` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "imgHeight" INTEGER,
ADD COLUMN     "imgWidth" INTEGER;

-- AlterTable
ALTER TABLE "PhotoAlbum" DROP COLUMN "MosaicLayout";
