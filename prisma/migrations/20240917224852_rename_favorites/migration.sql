/*
  Warnings:

  - You are about to drop the `favoritePhotographers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favoritePhotographers" DROP CONSTRAINT "favoritePhotographers_photographerId_fkey";

-- DropForeignKey
ALTER TABLE "favoritePhotographers" DROP CONSTRAINT "favoritePhotographers_userId_fkey";

-- DropTable
DROP TABLE "favoritePhotographers";

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photographerId" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_photographerId_key" ON "Favorites"("userId", "photographerId");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
