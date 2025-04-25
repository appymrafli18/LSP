const timeArrival = (departureTime: string, arrivalTime: string): string => {
  const departure = new Date(departureTime)
  const arrival = new Date(arrivalTime)

  // Calculate the difference in milliseconds
  const diff = arrival.getTime() - departure.getTime()

  // Convert to hours and minutes
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
}

export default timeArrival
