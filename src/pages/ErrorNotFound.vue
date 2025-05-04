<template>
  <q-page class="bg-dark text-white q-pa-xl flex flex-center">
    <transition appear enter-active-class="animated fadeIn">
      <div class="text-center">
        <div class="text-h2 text-negative text-bold q-mb-md">404</div>
        <div class="text-subtitle2 q-mb-lg">Página não encontrada</div>
        <BaseButton label="Voltar para o início" class="btn-primary" @click="goHome" />
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from 'components/BaseButton.vue'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}
</script>
