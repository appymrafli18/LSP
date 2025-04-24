export interface FLIGHT {
  id?: number;
  uuid?: string;
  no_penerbangan: string;
  waktu_keberangkatan?: string;
  waktu_kedatangan?: string;
  kapasitas_kursi?: number;
  kursi_tersedia?: number;
  kota_keberangkatan: string;
  kota_tujuan: string;
  harga: number;
}

export interface SelectFlight {
  id: number;
  uuid: string;
  no_penerbangan: string;
  kota_keberangkatan: string;
  kota_tujuan: string;
  waktu_keberangkatan: string;
  waktu_kedatangan: string;
  harga: string;
  kapasitas_kursi: number;
  kursi_tersedia: number;
  createdAt: string;
  updatedAt: string;
  airlines: {
    id: number;
    uuid: string;
    name: string;
    logo: string;
    createdAt: string;
    updatedAt: string;
  };
  bookings?: {
    id: number;
    uuid: string;
    jumlah_kursi: number;
    total_harga: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user?: {
      id: number;
      uuid: string;
      username: string;
      name: string;
      email: string;
    };
  }[];
}
