/*
  Warnings:

  - You are about to drop the `SeatClassDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seatClasses` to the `Flights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SeatClassDetails" DROP CONSTRAINT "SeatClassDetails_flightId_fkey";

-- AlterTable
ALTER TABLE "Flights" ADD COLUMN     "seatClasses" JSONB NOT NULL;

-- DropTable
DROP TABLE "SeatClassDetails";
