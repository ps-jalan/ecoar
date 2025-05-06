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
            <div class="text-title">
              <q-badge
                class="q-ml-sm q-pa-sm float-right"
                :label="coletaOperationName(coleta?.status)"
                :color="coletaColor(coleta?.status)"
                text-color="white"
              />
              Status do Pedido
            </div>
            <div class="text-subtitle2" v-if="loading">Carregando...</div>
            <div v-else>
              <div class="text-subtitle2">Pedido: #{{ coleta?.id }}</div>
              <div class="text-subtitle2" v-if="coleta?.criado_em">
                Data: {{ formatarData(coleta?.criado_em) }}
              </div>
            </div>
          </q-card-section>

          <q-separator dark class="q-my-sm" />

          <q-card v-if="loading" class="card-dark q-pa-md flex flex-center">
            <q-spinner color="primary" size="40px" />
          </q-card>
          <q-card-section v-else>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="coleta in historico || []"
                :key="coleta.id"
                :icon="coletaIcon(coleta.status)"
                :color="coletaColor(coleta.status)"
                :title="coletaOperationName(coleta.status)"
                :subtitle="formatarData(coleta.criado_em)"
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
const coleta = computed(() => requestsStore.coleta || {})
const historico = ref([])

onMounted(() => {
  const requestId = route.params.id
  loading.value = true
  requestsStore.fetchColeta(requestId).finally(() => {
    loading.value = false

    mostrarHistorico()
  })
})

async function mostrarHistorico() {
  if (coleta.value.historico) {
    for (const h of coleta.value.historico) {
      await new Promise((resolve) => {
        const tempo = Math.floor(Math.random() * (1500 - 300 + 1)) + 300
        setTimeout(() => {
          historico.value.push(h)
          resolve()
        }, tempo)
      })
    }
  }
}

function coletaOperationName(status) {
  switch (status) {
    case 'waiting':
      return 'Esperando entregador'
    case 'to_address':
      return 'A caminho do seu endereço'
    case 'to_station':
      return 'A caminho da estação'
    case 'delivered':
      return 'Entregue na estação'
    case 'reviwed':
      return 'Revisado'
    case 'completed':
      return 'Concluído'
    default:
      return ''
  }
}

function coletaIcon(status) {
  switch (status) {
    case 'waiting':
      return 'schedule'
    case 'to_address':
      return 'directions_bike'
    case 'to_station':
      return 'directions_bike'
    case 'delivered':
      return 'store'
    case 'reviwed':
      return 'star'
    case 'completed':
      return 'check_circle'
    default:
      return ''
  }
}

function coletaColor(status) {
  switch (status) {
    case 'waiting':
      return 'warning'
    case 'to_address':
      return 'info'
    case 'to_station':
      return 'info'
    case 'delivered':
      return 'positive'
    case 'reviwed':
      return 'positive'
    case 'completed':
      return 'purple'
    default:
      return ''
  }
}

function formatarData(dataISO) {
  const data = new Date(dataISO)

  // Corrige para UTC−3
  const dataUTC3 = new Date(data.getTime() - 3 * 60 * 60 * 1000)

  const dia = dataUTC3.getDate().toString().padStart(2, '0')
  const mes = dataUTC3.toLocaleString('pt-BR', { month: 'long' })
  const ano = dataUTC3.getFullYear()
  const hora = dataUTC3.getHours().toString().padStart(2, '0')
  const minutos = dataUTC3.getMinutes().toString().padStart(2, '0')

  return `${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)} de ${ano} às ${hora}:${minutos}`
}
</script>
