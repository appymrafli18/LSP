type TransaksiData = {
  type: "Transaksi";
  total: number;
  jumlah_tiket: number;
  status: string;
};

type PenerbanganData = {
  type: "Penerbangan";
  kota_keberangkatan: string;
  kota_tujuan: string;
  jumlah_penumpang: number;
};

type KeuanganData = {
  type: "Keuangan";
  total_pendapatan: number;
  total_pengeluaran: number;
  laba_bersih: number;
};

type LainnyaData = {
  type: "Lainnya";
  [key: string]: unknown;
};

export type ReportData =
  | TransaksiData
  | PenerbanganData
  | KeuanganData
  | LainnyaData;
