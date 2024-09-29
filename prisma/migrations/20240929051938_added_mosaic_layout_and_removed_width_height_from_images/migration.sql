/*
  Warnings:

  - You are about to drop the column `imgHeight` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `imgWidth` on the `Images` table. All the data in the column will be lost.
  - Added the required column `MosaicLayout` to the `PhotoAlbum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" DROP COLUMN "imgHeight",
DROP COLUMN "imgWidth";

-- AlterTable
ALTER TABLE "PhotoAlbum" ADD COLUMN     "MosaicLayout" JSONB NOT NULL;
