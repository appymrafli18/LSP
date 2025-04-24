export default function timeArrival(awal: string, akhir: string): string {
  const departure = new Date(awal);
  const arrival = new Date(akhir);
  const diff = arrival.getTime() - departure.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}j ${minutes}m`;
}
