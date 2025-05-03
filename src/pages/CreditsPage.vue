<template>
  <q-page class="bg-dark text-white q-pa-md">
    <q-card class="card-dark q-pa-md">
      <q-card-section>
        <div class="text-title">Minha Carteira de Créditos</div>
        <div class="text-subtitle2">Total acumulado</div>
        <div class="text-h4 text-bold q-mt-md">{{ totalKg.toFixed(1) }} kg CO₂</div>
        <div class="text-subtitle2">Equivalente a R$ {{ totalReais.toFixed(2) }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-btn
          to="/resgatar"
          label="Trocar por dinheiro ou serviços"
          class="btn-primary full-width"
        />
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Histórico de créditos</div>
        <q-list bordered separator>
          <q-item v-for="(c, index) in historico" :key="index">
            <q-item-section>
              <q-item-label
                >+ {{ c.kg.toFixed(1) }} kg CO₂ (R$ {{ (c.kg * 1.5).toFixed(2) }})</q-item-label
              >
              <q-item-label caption>{{ formatarData(c.criado_em) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'boot/supabase'

const historico = ref([])
const totalKg = ref(0)
const totalReais = ref(0)

function formatarData(str) {
  if (!str) return ''
  const d = new Date(str)
  return d.toLocaleString('pt-BR')
}

onMounted(async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    alert('Erro ao identificar usuário.')
    return
  }

  const { data, error } = await supabase
    .from('coletas')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'revisado')

  if (error) {
    alert('Erro ao carregar créditos: ' + error.message)
    return
  }

  historico.value = data.map((coleta) => ({
    kg: coleta.peso,
    criado_em: coleta.criado_em,
  }))

  totalKg.value = historico.value.reduce((sum, c) => sum + c.kg, 0)
  totalReais.value = totalKg.value * 1.5
})
</script>
