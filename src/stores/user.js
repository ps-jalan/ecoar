import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'
import { Notify } from 'quasar'
import { v4 as uuid4 } from 'uuid'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        if (error.message !== 'Auth session missing!')
          console.error('Erro ao obter usuário:', error.message)
        localStorage.removeItem('sb-vrkdrkcfirpvsfydvhwa-auth-token')
        this.user = null
      } else {
        this.user = data.user
      }

      return this.user
    },
    async updateUser(updatedData) {
      const { data, error } = await supabase.auth.updateUser(updatedData)
      if (error) {
        console.error('Erro ao atualizar usuário:', error.message)
        return false
      }
      console.log('Usuário atualizado:', data.user)
      this.user = data.user
      return true
    },
    async uploadProfilePicture(file) {
      const fileExt = file.name.split('.').pop()
      const uuid = uuid4()
      const fileName = `${uuid}.${fileExt}`
      const filePath = `${this.user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, {
          upsert: true, // Substitui o arquivo existente, se houver
        })

      if (uploadError) {
        console.error('Erro ao fazer upload da imagem:', uploadError.message)
        return
      }

      // // Obter a URL pública da imagem
      // const { publicURL, error: urlError } = supabase.storage
      //   .from('profile-pictures')
      //   .getPublicUrl(filePath)

      // if (urlError) {
      //   console.error('Erro ao obter a URL pública:', urlError.message)
      //   return
      // }
      const publicURL = `https://vrkdrkcfirpvsfydvhwa.supabase.co/storage/v1/object/public/profile-pictures/${filePath}`

      console.log('URL pública da imagem:', publicURL)

      const updatedData = {
        data: {
          avatar_url: publicURL,
          picture: publicURL,
        },
      }

      // Atualizar o perfil do usuário com a nova URL da imagem
      if (this.updateUser(updatedData)) {
        Notify.create({ type: 'positive', message: 'Imagem de perfil atualizada com sucesso!' })
      }
    },

    async registerWithEmail(email, password, name) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        console.error(error.message)
      } else {
        console.log('Usuário registrado:', data.user)

        Notify.create({
          message: 'Verifique seu email para concluir o cadastro.',
          color: 'positive',
          position: 'top',
        })
      }

      this.user = data.user
      return { success: true }
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
