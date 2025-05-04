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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from 'boot/supabase'

const route = useRoute()
const coleta = ref(null)
const loading = ref(true)

function formatarData(str) {
  if (!str) return ''
  const d = new Date(str)
  return d.toLocaleString('pt-BR')
}

onMounted(async () => {
  const { id } = route.params
  const { data, error } = await supabase.from('coletas').select('*').eq('id', id).single()

  if (error) {
    alert('Erro ao buscar coleta: ' + error.message)
  } else {
    coleta.value = data
  }
  loading.value = false
})
</script>
