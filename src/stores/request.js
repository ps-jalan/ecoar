import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'
import { Notify } from 'quasar'

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
        Notify.create({
          message: 'Erro ao buscar coletas do usuário: ' + error.message,
          color: 'negative',
          position: 'top',
        })
        return null
      }
      // console.log('Coleta:', data)
      this.coletasDoUsuario = data

      return this.coletasDoUsuario
    },
    async createColeta(coleta) {
      const { data, error } = await supabase.from('Coletas').insert([coleta]).select().single()
      if (error) {
        console.error('Erro ao criar coleta:', error.message)
        Notify.create({
          message: 'Erro ao criar coleta: ' + error.message,
          color: 'negative',
          position: 'top',
        })

        return false
      }

      Notify.create({
        message: 'Coleta criada com sucesso!',
        color: 'positive',
        position: 'top',
      })

      return data
    },
  },
})
