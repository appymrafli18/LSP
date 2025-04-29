export interface ICreateBooking {
  jumlah_kursi: number;
  flightId: string;
  userId?: number;
  seatClass: string;
}

export interface BOOKING {
  id: number;
  uuid: string;
  jumlah_kursi: number;
  total_harga: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  user: {
    id?: number;
    uuid?: string;
    username?: string;
    name: string;
    email?: string;
  };
  flight: {
    no_penerbangan: string;
  };
}
