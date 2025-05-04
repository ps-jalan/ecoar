import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'
import { Notify } from 'quasar'

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
    async loginWithEmail(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        console.error('Erro ao fazer login:', error.message)
        return { success: false, message: error.message }
      }
      this.user = data.user
      return { success: true }
    },

    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/home',
        },
      })
      if (error) {
        Notify.create({ type: 'negative', message: error.message })
      }
    },

    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Erro ao sair:', error.message)
      } else {
        this.user = null
      }
    },
  },
})
