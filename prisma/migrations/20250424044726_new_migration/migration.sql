/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Flights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flights" DROP COLUMN "isDeleted";

-- DropEnum
DROP TYPE "TypeReport";
