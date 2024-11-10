-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
