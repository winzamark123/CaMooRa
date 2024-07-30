/*
  Warnings:

  - You are about to drop the column `instagram` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicURL` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Contact` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clerkId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Contact_userId_key";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "instagram",
DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "instagramLink" TEXT,
ADD COLUMN     "instagramTitle" TEXT,
ADD COLUMN     "isContactPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPhotographer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "portfolioLink" TEXT,
ADD COLUMN     "portfolioTitle" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profilePicURL",
DROP COLUMN "userId",
ADD COLUMN     "additionalName" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "profilePicId" TEXT NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("clerkId");

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imgWidth" INTEGER,
    "imgHeight" INTEGER,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_clerkId_key" ON "Contact"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_clerkId_key" ON "Profile"("clerkId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profilePicId_fkey" FOREIGN KEY ("profilePicId") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
