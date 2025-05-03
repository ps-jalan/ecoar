import { defineStore } from 'pinia'

export const useRequestStore = defineStore('request', {
  state: () => ({
    currentRequest: null,
    history: JSON.parse(localStorage.getItem('ecoar_history') || '[]'),
  }),
  actions: {
    setRequest(req) {
      this.currentRequest = req
    },
    setHistory(list) {
      this.history = list
      localStorage.setItem('ecoar_history', JSON.stringify(list))
    },
  },
})
