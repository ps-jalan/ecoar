<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card v-if="loading" class="card-dark q-pa-md flex flex-center">
        <q-spinner color="primary" size="40px" />
      </q-card>

      <q-card v-else class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Status da Coleta</div>
          <div class="text-subtitle2">Pedido #{{ coleta?.id?.substring(0, 8) }}</div>
        </q-card-section>

        <q-separator dark class="q-my-sm" />

        <q-card-section>
          <q-timeline color="primary">
            <q-timeline-entry
              title="Solicitado"
              :subtitle="formatarData(coleta.criado_em)"
              icon="schedule"
            />
            <q-timeline-entry
              v-if="['a_caminho', 'entregue', 'revisado'].includes(coleta.status)"
              title="Coletor a caminho"
              icon="directions_bike"
            />
            <q-timeline-entry
              v-if="['entregue', 'revisado'].includes(coleta.status)"
              title="Material entregue na estação"
              icon="store"
            />
            <q-timeline-entry
              v-if="coleta.status === 'revisado'"
              title="Revisão concluída"
              icon="task_alt"
              color="green"
            />
          </q-timeline>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn to="/home" label="Voltar para home" class="btn-outline-white" />
        </q-card-actions>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRequestsStore } from 'stores/requests'

const route = useRoute()
const requestsStore = useRequestsStore()

onMounted(() => {
  const requestId = route.params.id
  requestsStore.fetchStatus(requestId)
})
</script>
