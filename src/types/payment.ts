export interface IPayment {
  bookingId: string;
  payment_method: string;
  jumlah_pembayaran?: number;
  status?: string;
}

export interface FLIGHT {
  id: number;
  uuid: string;
  no_penerbangan: string;
  kota_keberangkatan: string;
  kota_tujuan: string;
  waktu_keberangkatan: string;
  waktu_kedatangan: string;
  harga: string;
  createdAt: string;
  updatedAt: string;
  airlines?: {
    name: string;
    logo: string;
  };
}

export interface BOOKING {
  id: number;
  uuid: string;
  jumlah_kursi: number;
  total_harga: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  flightId: number;
  userId: number;
  flight: FLIGHT;
}

export interface PAYMENT {
  id: number;
  uuid: string;
  payment_method: string;
  jumlah_pembayaran: string;
  status: string;
  booking: {
    status: string;
    user: {
      name: string;
    };
  };
}
