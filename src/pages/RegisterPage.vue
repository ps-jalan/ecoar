<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <transition appear enter-active-class="animated fadeInUp">
      <div>
        <q-card flat bordered class="q-pa-lg" style="width: 320px; background-color: #1e1e1e">
          <div class="text-title text-center q-mb-md">Criar conta</div>

          <q-input v-model="email" label="E-mail" class="input-dark q-mt-md" />

          <q-input v-model="senha" label="Senha" type="password" class="input-dark q-mt-sm" />

          <q-btn label="Cadastrar" class="btn-primary full-width q-mt-lg" @click="register" />

          <q-btn flat class="q-mt-sm full-width text-white" to="/login" label="Voltar para login" />
        </q-card>
      </div>
    </transition>
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
