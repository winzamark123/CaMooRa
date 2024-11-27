/*
  Warnings:

  - You are about to drop the column `isContactPublic` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `isPhotographer` on the `Contact` table. All the data in the column will be lost.

*/
-- First add the new columns to Profile
ALTER TABLE "Profile" 
ADD COLUMN "isContactPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "isPhotographer" BOOLEAN NOT NULL DEFAULT false;

-- Then copy the existing data from Contact to Profile
UPDATE "Profile" p
SET 
    "isContactPublic" = c."isContactPublic",
    "isPhotographer" = c."isPhotographer"
FROM "Contact" c
WHERE p."userId" = c."userId";

-- Finally, remove the columns from Contact
ALTER TABLE "Contact" 
DROP COLUMN "isContactPublic",
DROP COLUMN "isPhotographer";