export interface ICreateBooking {
  jumlah_kursi: number;
  flightId: string;
  userId?: number;
}

export interface BOOKING {
  id: number;
  uuid: string;
  jumlah_kursi: number;
  total_harga: string;
  status: string;
  user: {
    name: string;
  };
  flight: {
    no_penerbangan: string;
  };
}
