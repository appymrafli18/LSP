import {IAirlines} from "@/types/airlines";
import {BOOKING} from "@/types/booking";

export interface FLIGHT {
  id?: number;
  uuid?: string;
  no_penerbangan: string;
  waktu_keberangkatan: string;
  waktu_kedatangan: string;
  kapasitas_kursi: number;
  kursi_tersedia: number;
  kota_keberangkatan: string;
  kota_tujuan: string;
  // harga: number;
  airlines?: IAirlines;
  seatClasses: SeatClass[];
}

export interface SeatClass {
  type: "Economy" | "Business" | "FirstClass"
  harga: string
  active: boolean;
}

export interface SelectFlight extends FLIGHT {
  createdAt: string;
  updatedAt: string;
  bookings: BOOKING[];
}
