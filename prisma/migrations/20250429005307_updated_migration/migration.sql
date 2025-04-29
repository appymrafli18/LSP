/*
  Warnings:

  - Added the required column `total_harga` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatClass` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "total_harga" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "seatClass" TEXT NOT NULL;
