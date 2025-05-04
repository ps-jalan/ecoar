import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Erro ao obter usuário:', error.message)
        return null
      }
      this.user = data.user
      return data.user
    },
    async updateUser(updatedData) {
      const { data, error } = await supabase.auth.updateUser(updatedData)
      if (error) {
        console.error('Erro ao atualizar usuário:', error.message)
        return false
      }
      this.user = data.user
      return true
    },
  },
})
