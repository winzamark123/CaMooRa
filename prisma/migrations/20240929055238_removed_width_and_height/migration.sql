/*
  Warnings:

  - You are about to drop the column `imgHeight` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `imgWidth` on the `Images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Images" DROP COLUMN "imgHeight",
DROP COLUMN "imgWidth";
