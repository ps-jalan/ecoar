import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  persist: true, // ⬅️ Habilita persistência local (localStorage)
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (!error) {
        this.user = data.user
      }
    },
    setUser(data) {
      this.user = data
    },
    logout() {
      this.user = null
      supabase.auth.signOut()
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
})
