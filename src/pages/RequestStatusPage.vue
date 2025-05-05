<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <div>
        <q-btn
          to="/home"
          label="Voltar"
          icon="las la-angle-left"
          flat
          class="q-mb-lg q-pa-sm text-uppercase"
        />

        <q-card class="card-dark q-pa-md">
          <q-card-section>
            <div class="text-title">Status da Coleta</div>
            <div class="text-subtitle2" v-if="loading">Carregando...</div>
            <div class="text-subtitle2" v-else>Pedido #{{ coleta?.id }}</div>
          </q-card-section>

          <q-separator dark class="q-my-sm" />

          <q-card v-if="loading" class="card-dark q-pa-md flex flex-center">
            <q-spinner color="primary" size="40px" />
          </q-card>
          <q-card-section v-else>
            <q-timeline color="primary">
              <q-timeline-entry
                title="Solicitado"
                :subtitle="formatarData(coleta?.criado_em)"
                icon="schedule"
                color="warning"
              />
              <q-timeline-entry
                title="Coletor a caminho"
                :subtitle="formatarData(coleta?.criado_em)"
                icon="directions_bike"
                color="info"
              />
              <q-timeline-entry
                title="Material entregue na estação"
                :subtitle="formatarData(coleta?.criado_em)"
                icon="store"
                color="positive"
              />
              <q-timeline-entry
                title="Créditos de carbono gerados"
                :subtitle="formatarData(coleta?.criado_em)"
                icon="task_alt"
                color="positive"
              />
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRequestsStore } from 'stores/request'

const route = useRoute()
const requestsStore = useRequestsStore()

const loading = ref(false)
const coleta = computed(() => requestsStore.coleta || null)

onMounted(() => {
  const requestId = route.params.id
  loading.value = true
  requestsStore.fetchColeta(requestId).finally(() => {
    loading.value = false
  })
})

function formatarData(dataISO) {
  const data = new Date(dataISO)

  const dia = data.getDate().toString().padStart(2, '0')
  const mes = data.toLocaleString('pt-BR', { month: 'long' })
  const ano = data.getFullYear()
  const hora = data.getHours().toString().padStart(2, '0')
  const minutos = data.getMinutes().toString().padStart(2, '0')

  return `${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)} de ${ano} às ${hora}:${minutos}`
}
</script>
