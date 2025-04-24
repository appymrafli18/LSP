import { create } from 'zustand';
import { FLIGHT } from '@/types/payment';

interface FlightStore {
  selectedFlight: FLIGHT | null;
  setSelectedFlight: (flight: FLIGHT) => void;
  clearSelectedFlight: () => void;
}

const useFlightStore = create<FlightStore>((set) => ({
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  clearSelectedFlight: () => set({ selectedFlight: null }),
}));

export default useFlightStore;