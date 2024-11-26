/*
  Warnings:

  - You are about to drop the column `isContactPublic` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `isPhotographer` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "isContactPublic",
DROP COLUMN "isPhotographer";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "isContactPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPhotographer" BOOLEAN NOT NULL DEFAULT false;
