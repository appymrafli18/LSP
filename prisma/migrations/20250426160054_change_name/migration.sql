/*
  Warnings:

  - You are about to drop the column `seatClass` on the `SeatClassDetails` table. All the data in the column will be lost.
  - Added the required column `type` to the `SeatClassDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeatClassDetails" DROP COLUMN "seatClass",
ADD COLUMN     "type" "SeatClass" NOT NULL;
