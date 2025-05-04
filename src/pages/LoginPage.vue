<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <transition appear enter-active-class="animated fadeIn">
      <div>
        <div class="text-center q-mb-xl">
          <q-img src="~assets/logos/logo_white.webp" style="width: 200px" />
        </div>

        <q-card flat bordered class="card-dark q-pa-lg" style="width: 320px">
          <q-input
            v-model="email"
            label="E-mail"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          />
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          />

          <q-btn
            label="Entrar"
            class="btn-primary full-width q-mt-lg q-mb-sm q-pa-sm"
            @click="login"
          />

          <q-separator spaced dark />

          <q-btn
            rounded
            class="full-width q-mt-sm"
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
                  class="q-mr-sm"
                />
                <span>Entrar com Google</span>
              </div>
            </template>
          </q-btn>
        </q-card>

        <q-btn
          label="Criar conta"
          to="/register"
          class="btn-outline-white full-width q-mt-lg q-pa-sm"
        />
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
