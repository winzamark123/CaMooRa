/*
  Warnings:

  - A unique constraint covering the columns `[coverImageId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "coverImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_coverImageId_key" ON "Profile"("coverImageId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
