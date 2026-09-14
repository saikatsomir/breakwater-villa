/*
  Warnings:

  - You are about to drop the column `guests` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `contactMethod` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inquiryType` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "guests",
ADD COLUMN     "contactMethod" TEXT NOT NULL,
ADD COLUMN     "inquiryType" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "phone" SET NOT NULL;
