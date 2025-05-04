import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    status: null,
  }),
  actions: {
    async fetchStatus(requestId) {
      const { data, error } = await supabase
        .from('Coletas')
        .select('status')
        .eq('id', requestId)
        .single()
      if (error) {
        console.error('Erro ao buscar status da coleta:', error.message)
        return null
      }
      this.status = data.status
      return data.status
    },
  },
})
