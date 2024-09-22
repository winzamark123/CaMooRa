-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_clerkId_fkey";

-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "PhotoAlbumId" TEXT;

-- CreateTable
CREATE TABLE "PhotoAlbum" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "photoAlbumName" TEXT NOT NULL,

    CONSTRAINT "PhotoAlbum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotoAlbum" ADD CONSTRAINT "PhotoAlbum_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_PhotoAlbumId_fkey" FOREIGN KEY ("PhotoAlbumId") REFERENCES "PhotoAlbum"("id") ON DELETE CASCADE ON UPDATE CASCADE;
