// src/stores/auth.js
import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
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
        console.error('Erro no login com Google:', error.message)
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
