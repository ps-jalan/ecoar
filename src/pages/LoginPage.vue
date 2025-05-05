<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <q-img alt="Background" src="~assets/images/background.png" class="absolute full-height" />
    <transition appear enter-active-class="animated fadeIn">
      <div>
        <div class="text-center q-mb-xl">
          <q-img src="~assets/logos/logo.webp" style="width: 300px; margin-top: -100px" />
        </div>

        <q-card
          flat
          bordered
          class="card-dark q-pa-lg full-width"
          style="margin-top: -100px; min-width: 320px"
        >
          <q-input
            v-model="email"
            label="E-mail"
            icon="las la-envelope"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="las la-envelope" />
            </template>
          </q-input>
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="las la-key" />
            </template>
          </q-input>

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
          class="btn-dark full-width q-mt-lg q-pa-sm q-py-md"
        />
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const senha = ref('')

const login = async () => {
  const result = await userStore.loginWithEmail(email.value, senha.value)
  if (result.success) {
    router.push('/home')
  } else {
    alert(result.message)
  }
}

const loginWithGoogle = () => {
  userStore.loginWithGoogle()
}
</script>
