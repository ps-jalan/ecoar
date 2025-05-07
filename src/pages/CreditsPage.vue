<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md q-mb-md">
        <q-card-section>
          <div class="text-title">Minha Carteira</div>
          <div v-if="totalCredCO2 > 0" class="q-mt-md">
            <div class="text-subtitle2">Total acumulado</div>
            <div class="text-h4 text-bold q-mt-md">
              {{ numFormatoBrasil(totalCredCO2) }} Créditos
            </div>
            <div class="text-subtitle2">Foram {{ totalKg }} kg reciclados</div>
            <div class="text-subtitle2">Você reduziu {{ totalCo2Evitado_kg }} kg de CO₂</div>
            <div class="text-subtitle2">Valor da carteira é aproximadamente {{ totalReais }}</div>
          </div>
          <div v-else class="q-mt-md">
            <div class="text-subtitle2">Você ainda não possui créditos acumulados.</div>
            <div class="text-subtitle2">Recicle e ganhe créditos!</div>
          </div>
        </q-card-section>

        <q-card-section v-if="totalCredCO2 > 0">
          <BaseButton
            label="Trocar por dinheiro ou serviços"
            class="btn-primary full-width"
            @click="goToRedeem"
          />
        </q-card-section>
      </q-card>
    </transition>

    <transition appear enter-active-class="animated fadeInUp" v-if="historico.length">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Histórico de créditos</div>
          <q-list bordered separator>
            <q-item v-for="(c, index) in historico" :key="index">
              <q-item-section>
                <q-item-label>
                  + {{ numFormatoBrasil(c.creditos_co2) }} Créditos de carbono (
                  {{ c.valor_real }})</q-item-label
                >
                <q-item-label caption
                  >Redução: {{ c.co2Evitado_kg.toFixed(2) }} kg CO₂</q-item-label
                >
                <q-item-label caption>{{ formatarData(c.criado_em) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'boot/supabase'
import { useRouter } from 'vue-router'
import BaseButton from 'components/BaseButton.vue'

const router = useRouter()
const historico = ref([])
const totalKg = ref(0)
const totalCo2Evitado_kg = ref(0)
const totalCredCO2 = ref(0)
const totalReais = ref(0)

const precoPorTonelada = 80 // Preço em reais por tonelada de CO₂

// function formatarData(str) {
//   if (!str) return ''
//   const d = new Date(str)
//   return d.toLocaleString('pt-BR', { style: 'date', timeZone: 'America/Sao_Paulo' })
// }

function goToRedeem() {
  router.push('/resgatar')
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

  const { data, error } = await supabase.from('Coletas').select('*').eq('user_id', user.id)

  if (error) {
    alert('Erro ao carregar créditos: ' + error.message)
    return
  }

  historico.value = data.map((coleta) => ({
    kg: coleta.peso,
    creditos_co2: coleta.creditos_co2,
    co2Evitado_kg: coleta.co2Evitado_kg,
    valor_real: ajustaReal(coleta.creditos_co2 * precoPorTonelada),
    criado_em: formatarData(coleta.criado_em),
  }))

  totalKg.value = numFormatoBrasil(historico.value.reduce((sum, c) => sum + c.kg, 0))
  totalCredCO2.value = historico.value.reduce((sum, c) => sum + c.creditos_co2, 0)
  totalCo2Evitado_kg.value = numFormatoBrasil(
    historico.value.reduce((sum, c) => sum + c.co2Evitado_kg, 0),
  )
  totalReais.value = ajustaReal(totalCredCO2.value * precoPorTonelada) // 80 reais por tonelada
})

function ajustaReal(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function numFormatoBrasil(valor) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatarData(dataISO) {
  const data = new Date(dataISO)

  // Corrige para UTC−3
  const dataUTC3 = new Date(data.getTime() - 3 * 60 * 60 * 1000)
  return dataUTC3
  // const dia = dataUTC3.getDate().toString().padStart(2, '0')
  // const mes = dataUTC3.toLocaleString('pt-BR', { month: 'long' })
  // const ano = dataUTC3.getFullYear()
  // const hora = dataUTC3.getHours().toString().padStart(2, '0')
  // const minutos = dataUTC3.getMinutes().toString().padStart(2, '0')

  // return `${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)} de ${ano} às ${hora}:${minutos}`
}
</script>
