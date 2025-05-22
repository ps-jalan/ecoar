<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md q-mb-md">
        <q-card-section>
          <div class="text-title">Minha Carteira</div>
          <div v-if="totalCredCO2 > 0" class="q-mt-md">
            <div class="text-subtitle2">Total acumulado</div>
            <div class="text-h4 text-bold q-mt-md">
              <q-icon
                name="las la-leaf"
                size="md"
                class="text-green q-mr-sm"
                style="vertical-align: middle"
              />
              <label style="vertical-align: middle">
                {{ numFormatoBrasil(totalCredCO2) }} Créditos
              </label>
            </div>

            <!-- <div class="text-caption">{{ totalKg }} kg reciclados</div> -->
            <!-- <div class="text-subtitle2">Você reduziu {{ totalCo2Evitado_kg }} kg de CO₂</div> -->
            <!-- <div class="text-subtitle2">Valor da carteira é aproximadamente {{ totalReais }}</div> -->
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
          <div class="text-h6 q-mb-lg">Histórico de créditos</div>
          <!-- <q-list bordered separator>
            <q-item v-for="(c, index) in historico" :key="index">
              <q-item-section>
                <q-item-label caption class="">{{ c.criado_em }}</q-item-label>
                <q-item-label class="text-h6 text-bold q-pb-sm">
                  {{ c.tipo_material }} - {{ c.kg }} kg
                </q-item-label>
                <q-item-label>
                  <q-icon name="las la-burn" size="sm" class="text-red" />
                  {{ numFormatoBrasil(c.co2Evitado_kg) }} kg CO₂ evitados
                </q-item-label>
                <q-item-label>
                  <q-icon name="las la-leaf" size="sm" class="text-green" />
                  {{ numFormatoBrasil(c.creditos_co2) }} Créditos de carbono ({{ c.valor_real }})
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list> -->
          <q-timeline color="primary" layout="dense">
            <q-timeline-entry
              v-for="(c, index) in historico"
              :key="index"
              :title="c.tipo_material + ' - ' + c.kg + ' kg'"
              :subtitle="c.criado_em"
              class="q-ma-none q-pa-none"
            >
              <template v-slot:default>
                <div class="q-mb-xs">
                  <q-icon name="las la-burn" size="sm" class="text-red q-mr-xs" />
                  <label style="vertical-align: middle">
                    {{ numFormatoBrasil(c.co2Evitado_kg) }} kg CO₂ evitados
                  </label>
                </div>
                <div>
                  <q-icon name="las la-leaf" size="sm" class="text-green q-mr-xs" />
                  <label style="vertical-align: middle">
                    {{ numFormatoBrasil(c.creditos_co2) }} Créditos de carbono ({{ c.valor_real }})
                  </label>
                </div>
              </template>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue'
// import { supabase } from 'boot/supabase'
import { useUserStore } from 'stores/user'
import { useRequestsStore } from 'stores/request'
import { useRouter } from 'vue-router'
import BaseButton from 'components/BaseButton.vue'

const userStore = useUserStore()
const requestStore = useRequestsStore()
const user = userStore.user

const router = useRouter()
const precoPorTonelada = 80 // Preço em reais por tonelada de CO₂

const coletasDoUsuario = computed(() => requestStore?.coletasDoUsuario || [])
const historico = computed(() =>
  coletasDoUsuario.value.map((coleta) => ({
    tipo_material: coleta.tipo,
    kg: coleta.peso,
    creditos_co2: coleta.creditos_co2,
    co2Evitado_kg: coleta.co2Evitado_kg,
    valor_real: ajustaReal(coleta.creditos_co2 * precoPorTonelada),
    criado_em: formatarDataBrasileira(coleta.criado_em),
  })),
)

const totalKg = computed(() => numFormatoBrasil(historico.value.reduce((sum, c) => sum + c.kg, 0)))
const totalCo2Evitado_kg = computed(() =>
  numFormatoBrasil(historico.value.reduce((sum, c) => sum + c.co2Evitado_kg, 0)),
)
totalCo2Evitado_kg.value = numFormatoBrasil(
  historico.value.reduce((sum, c) => sum + c.co2Evitado_kg, 0),
)
const totalCredCO2 = computed(() => historico.value.reduce((sum, c) => sum + c.creditos_co2, 0))
const totalReais = computed(() => ajustaReal(totalCredCO2.value * precoPorTonelada))

function formatarData(str) {
  if (!str) return ''
  const d = new Date(str)
  return d.toLocaleString('pt-BR', { style: 'date', timeZone: 'America/Sao_Paulo' })
}

function goToRedeem() {
  router.push('/resgatar')
}

onMounted(async () => {
  await requestStore.fetchColetasDoUsuario(user.id)

  historico.value = coletasDoUsuario.value.map((coleta) => ({
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

function formatarDataBrasileira(dataISO) {
  // Garante formato ISO válido substituindo espaço por 'T'
  const data = new Date(dataISO.replace(' ', 'T') + 'Z')

  // Formata para o fuso de São Paulo usando Intl
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(data)
    .replace(',', ' às')
}
</script>
