<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <q-card flat bordered class="card-dark q-pa-lg" style="width: 320px">
      <div class="text-title q-mb-md text-center">Verificação</div>
      <div class="text-body q-mb-md text-center">Insira o código enviado para seu celular.</div>

      <q-input v-model="otp" label="Código OTP" maxlength="6" filled class="input-base" />

      <q-btn label="Verificar" class="btn-primary q-mt-md" @click="verifyOtp" />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const otp = ref('')

function verifyOtp() {
  alert('Função OTP ainda será implementada')
}
</script>
