<template>
  <q-page class="bg-dark text-white q-pa-md flex flex-center">
    <transition appear enter-active-class="animated fadeInDown">
      <q-card class="card-dark q-pa-xl" style="width: 320px">
        <q-card-section>
          <div class="text-title text-center">Confirmação</div>
          <div class="text-subtitle2 text-center">Digite o código recebido no seu e-mail</div>
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <q-input
            v-model="otp"
            label="Código OTP"
            maxlength="6"
            type="text"
            class="input-dark"
            filled
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Verificar" class="btn-primary full-width" @click="verificarOTP" />
        </q-card-actions>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// import { supabase } from 'boot/supabase'
import { useRouter } from 'vue-router'

const otp = ref('')
const router = useRouter()

async function verificarOTP() {
  // Aqui você implementaria a lógica de verificação com Supabase se estiver usando challenge
  alert('Código recebido: ' + otp.value)
  router.push('/home')
}
</script>
