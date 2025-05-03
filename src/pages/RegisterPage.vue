<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <div>
      <div class="text-center q-mb-xl">
        <q-img src="~assets/logos/logo_white.webp" style="width: 200px" />
      </div>
      <q-card flat bordered class="q-pa-lg card-dark" style="width: 320px">
        <q-input v-model="email" label="E-mail" class="input-base" filled />
        <q-input v-model="senha" label="Senha" type="password" class="input-base" filled />

        <q-btn label="Cadastrar" class="btn-primary q-mt-md" @click="register" />
        <q-btn flat class="q-mt-sm full-width text-white" to="/login" label="Voltar para login" />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from 'boot/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const router = useRouter()

const register = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: senha.value,
  })
  if (error) {
    alert(error.message)
  } else {
    alert('Verifique seu email para confirmar o cadastro.')
    router.push('/login')
  }
}
</script>
