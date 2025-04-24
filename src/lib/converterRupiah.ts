export default function convertToRupiah(amount: string | number) {
  const number = typeof amount === "string" ? parseInt(amount, 10) : amount;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}
