-- CreateTable
CREATE TABLE "favoritePhotographers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photographerId" TEXT NOT NULL,
    "clerkId" TEXT,

    CONSTRAINT "favoritePhotographers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favoritePhotographers_userId_photographerId_key" ON "favoritePhotographers"("userId", "photographerId");

-- AddForeignKey
ALTER TABLE "favoritePhotographers" ADD CONSTRAINT "favoritePhotographers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritePhotographers" ADD CONSTRAINT "favoritePhotographers_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
