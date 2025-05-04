<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <div>
        <div class="text-title q-mb-md">Bem-vindo(a) ao Ecoar</div>

        <q-card class="card-dark q-mb-md">
          <q-card-section>
            <div class="text-subtitle2">Coleta atual</div>
            <div class="text-body1 text-bold">1 coleta a caminho</div>
          </q-card-section>
        </q-card>

        <q-card class="card-dark q-mb-md">
          <q-card-section>
            <div class="text-subtitle2">Créditos de carbono</div>
            <div class="text-body1 text-bold">12.4 kg CO₂</div>
          </q-card-section>
        </q-card>

        <BaseButton
          label="Nova coleta"
          class="btn-primary full-width q-mb-sm"
          @click="() => router.push('/nova-solicitacao')"
        />

        <BaseButton
          label="Ver carteira"
          class="btn-outline-white full-width"
          @click="() => router.push('/creditos')"
        />
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from 'components/BaseButton.vue'

const router = useRouter()
</script>
