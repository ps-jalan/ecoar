import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useRequestsStore = defineStore('requests', {
  state: () => ({
    coleta: null,
    coletasDoUsuario: null,
  }),
  actions: {
    async fetchColeta(requestId) {
      const { data, error } = await supabase
        .from('Coletas')
        .select('*')
        .eq('id', requestId)
        .single()
      if (error) {
        console.error('Erro ao buscar coleta:', error.message)
        return null
      }
      console.log('Coleta:', data)
      this.coleta = data

      return this.coleta
    },
    async fetchColetasDoUsuario(userId) {
      const { data, error } = await supabase.from('Coletas').select('*').eq('user_id', userId) // Supondo que você tenha o ID do usuário armazenado no estado
      if (error) {
        console.error('Erro ao buscar coleta:', error.message)
        return null
      }
      console.log('Coleta:', data)
      this.coletasDoUsuario = data

      return this.coletasDoUsuario
    },
  },
})
