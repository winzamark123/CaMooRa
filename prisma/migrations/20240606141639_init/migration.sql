/*
  Warnings:

  - Made the column `clerkId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "whatsApp" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "clerkId" SET NOT NULL;
