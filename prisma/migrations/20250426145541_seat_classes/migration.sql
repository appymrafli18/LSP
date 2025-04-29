-- CreateEnum
CREATE TYPE "SeatClass" AS ENUM ('Economy', 'Business', 'FirstClass');

-- CreateTable
CREATE TABLE "SeatClassDetails" (
    "id" SERIAL NOT NULL,
    "seatClass" "SeatClass" NOT NULL,
    "harga" DECIMAL(10,2) NOT NULL,
    "flightId" INTEGER NOT NULL,

    CONSTRAINT "SeatClassDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeatClassDetails" ADD CONSTRAINT "SeatClassDetails_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
