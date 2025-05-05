<template>
  <q-page class="bg-dark text-white q-pa-xl">
    <transition appear enter-active-class="animated fadeIn">
      <div>
        <div class="text-title text-center q-mb-xl">Bem-vindo(a) {{ nome }}</div>

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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from 'components/BaseButton.vue'
import { useUserStore } from 'stores/user'

const router = useRouter()
const nome = ref('')

onMounted(() => {
  const userStore = useUserStore()
  nome.value = userStore.user?.user_metadata?.name || ''
})
</script>
