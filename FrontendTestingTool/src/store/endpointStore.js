import { create } from 'zustand';

export const useEndpointStore = create((set) => ({
  endpoints: [],
  setEndpoints: (data) => set({ endpoints: data }),
  addEndpoint: (endpoint) => set((state) => ({ endpoints: [...state.endpoints, endpoint] })),
  updateEndpoint: (id, updated) => set((state) => ({
    endpoints: state.endpoints.map(e => e._id === id ? { ...e, ...updated } : e)
  })),
  removeEndpoint: (id) => set((state) => ({
    endpoints: state.endpoints.filter(e => e._id !== id)
  })),
}));