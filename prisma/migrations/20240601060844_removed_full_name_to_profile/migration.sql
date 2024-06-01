/*
  Warnings:

  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName";
