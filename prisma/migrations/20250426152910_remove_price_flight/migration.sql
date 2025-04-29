/*
  Warnings:

  - You are about to drop the column `total_harga` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `harga` on the `Flights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "total_harga";

-- AlterTable
ALTER TABLE "Flights" DROP COLUMN "harga";
