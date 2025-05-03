<template>
  <q-page class="q-pa-md flex flex-center" style="background-color: #121212">
    <div>
      <div class="text-center q-mb-xl">
        <q-img src="~assets/logos/logo_white.png" style="width: 200px" />
      </div>
      <q-card flat bordered class="q-pa-lg" style="width: 320px; background-color: #1e1e1e">
        <q-input
          filled
          label="E-mail"
          label-color="grey-5"
          color="primary"
          bg-color="grey-10"
          v-model="email"
          class="q-mt-md"
        />
        <q-input
          filled
          label="Senha"
          type="password"
          label-color="grey-5"
          color="primary"
          bg-color="grey-10"
          v-model="senha"
          class="q-mt-sm"
        />

        <q-btn
          label="Entrar"
          color="primary"
          text-color="black"
          class="full-width q-mt-lg q-pa-md"
          @click="login"
        />
        <q-separator spaced />
        <q-btn
          class="full-width"
          style="background-color: white; color: #3c4043"
          @click="loginWithGoogle"
          no-caps
        >
          <template v-slot:default>
            <div class="row items-center justify-center">
              <q-img
                src="~assets/google-logo.png"
                alt="Google"
                style="width: 20px; height: 20px"
                class="q-mr-md"
              />
              <span>Entrar com Google</span>
            </div>
          </template>
        </q-btn>
      </q-card>
      <q-btn
        outline
        class="q-mt-md q-pa-md full-width text-white"
        to="/register"
        label="Criar conta"
      />
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

const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: senha.value,
  })
  if (error) {
    alert(error.message)
  } else {
    router.push('/home')
  }
}

const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/home' },
  })
}
</script>
