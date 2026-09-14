/*
  Warnings:

  - A unique constraint covering the columns `[actionToken]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "actionToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_actionToken_key" ON "Booking"("actionToken");
