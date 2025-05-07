<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Registrar nova coleta</div>
          <div class="text-subtitle2 q-mt-sm">
            Escaneie ou digite o QR Code da coleta e insira os dados
          </div>

          <BaseButton
            class="full-width q-mt-md q-mb-md"
            icon="qr_code_scanner"
            label="Escanear QR Code"
            @click="openQRScan"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <q-input
            v-model="qrCode"
            label="QR Code (ou digite manualmente)"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          />

          <q-select
            v-model="tipoMaterial"
            :options="tipos"
            label="Tipo de material"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          />

          <q-input
            v-model.number="pesoKg"
            type="number"
            label="Peso (kg)"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          />

          <q-input
            v-model="observacoes"
            type="textarea"
            label="Observações (opcional)"
            autogrow
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          />
        </q-card-section>

        <q-card-section align="right">
          <q-btn
            label="Solicitar coleta"
            class="btn-primary"
            @click="salvarColeta"
            :disable="!qrCode || !tipoMaterial || !pesoKg"
          />
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseButton from 'components/BaseButton.vue'
import { useUserStore } from 'stores/user'
import { useRequestsStore } from 'stores/request'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const requestStore = useRequestsStore()
const user = userStore.user

const qrCode = ref(null)
const tipoMaterial = ref(null)
const pesoKg = ref(null)
const observacoes = ref('')

const tipos = ['Papel', 'Plástico', 'Alumínio', 'Aço', 'Vidro', 'Eletrônicos']
const dataAgora = new Date()
const datasFuturas = gerarDataFuturaAleatoria(dataAgora)

onMounted(() => {
  const qrFromQuery = route.query.qr
  if (qrFromQuery) {
    qrCode.value = qrFromQuery
  }
})

function openQRScan() {
  router.push('/qrcode')
}

async function salvarColeta() {
  // console.log('user', user)

  const creditos_co2 = calcularCreditosCarbono(tipoMaterial.value, pesoKg.value).creditos_co2
  const co2Evitado_kg = calcularCreditosCarbono(tipoMaterial.value, pesoKg.value).co2Evitado_kg

  const coleta = {
    user_id: user.id,
    qr_code: qrCode.value,
    tipo: tipoMaterial.value,
    peso: pesoKg.value,
    observacoes: observacoes.value,
    status: 'completed',
    creditos_co2: creditos_co2,
    co2Evitado_kg: co2Evitado_kg,
    historico: [
      {
        status: 'waiting',
        criado_em: datasFuturas[0].toISOString(),
      },
      {
        status: 'to_address',
        criado_em: datasFuturas[1].toISOString(),
      },
      {
        status: 'to_station',
        criado_em: datasFuturas[2].toISOString(),
      },
      {
        status: 'delivered',
        criado_em: datasFuturas[3].toISOString(),
      },
      {
        status: 'reviwed',
        criado_em: datasFuturas[4].toISOString(),
      },
      {
        status: 'completed',
        criado_em: datasFuturas[5].toISOString(),
      },
    ],
  }

  const data = await requestStore.createColeta(coleta)

  if (data) {
    router.push(`/status/${data.id}`)
  }
}

function gerarDataFuturaAleatoria() {
  let datasFuturas = [dataAgora]
  for (let i = 0; i < 5; i++) {
    const minutosAleatorios = Math.floor(Math.random() * 15) + 1 // 1 a 15 minutos
    const dataFutura = new Date(datasFuturas[i].getTime() + minutosAleatorios * 60 * 1000)

    datasFuturas.push(dataFutura)
  }
  return datasFuturas
}

function calcularCreditosCarbono(tipoMaterial, pesoKg) {
  let fator = 0.575

  switch (tipoMaterial) {
    case 'Papel':
      fator = 0.575 // kg CO₂/kg
      break
    case 'Plástico':
      fator = 0.63 // kg CO₂/kg
      break
    case 'Alumínio':
      fator = 16.301 // kg CO₂/kg
      break
    case 'Aço':
      fator = 2.032 // kg CO₂/kg
      break
    case 'Vidro':
      fator = 0.25 // kg CO₂/kg
      break
    case 'Eletrônicos':
      fator = 1.77 // kg CO₂/kg
      break
    default:
      break
  }

  // Cálculo do total de CO₂ evitado (kg)
  const totalCO2_kg = pesoKg * fator

  // Conversão para toneladas de CO₂ (1 crédito = 1 tonelada)
  const totalCO2_t = totalCO2_kg / 1000

  // Preço do crédito de carbono por tonelada (em R$)
  const precoPorTonelada = 80.0 // Exemplo: R$ 80,00 por crédito https://credcarbo.com/carbono/qual-o-valor-de-1-credito-de-carbono-tonelada-de-co2-no-mercado-internacional-hoje/#:~:text=No%20Brasil%20os%20valores%20de,sobre%20o%20mercado%20de%20carbono

  // Valor monetário total dos créditos de carbono gerados (R$)
  const valorTotalReais = totalCO2_t * precoPorTonelada

  // Retorna um objeto com os resultados
  return {
    co2Evitado_kg: totalCO2_kg.toFixed(2), // CO2 evitado em kg (duas casas decimais)
    co2Evitado_t: totalCO2_t.toFixed(3), // CO2 evitado em toneladas
    creditos_co2: totalCO2_t.toFixed(3), // Créditos de carbono (mesmo número que toneladas)
    valor_real: valorTotalReais.toFixed(2), // Valor em Reais (R$)
  }
}

// function calcularCreditosCarbono(pesoPapel, pesoPlastico, pesoVidro, pesoAluminio, pesoAco, pesoEletronicos) {
//   pesoPapel = 0,
//   pesoPlastico = 0,
//   pesoVidro = 0,
//   pesoAluminio = 0,
//   pesoAco = 0,
//   pesoEletronicos = 0,

//   // Fatores de CO₂ evitado por kg de material reciclado (kg CO₂ / kg)
//   const fatorPapel = 0.575 // Papel: 0,575 kg CO₂/kg https://www.creditodelogisticareversa.com.br/toque-a-mais#:~:text=Para%20cada%20tonelada%20de%20pl%C3%A1stico,0%2C575%20toneladas%20de%20CO2%20equivalente
//   const fatorPlastico = 0.63 // Plástico: 0,63 kg CO₂/kg https://www.creditodelogisticareversa.com.br/toque-a-mais#:~:text=Para%20cada%20tonelada%20de%20pl%C3%A1stico,0%2C575%20toneladas%20de%20CO2%20equivalente
//   const fatorVidro = 0.25 // Vidro: 0,25 kg CO₂/kg https://niddedigital.com/vidro-reciclado-no-brasil-reduz-em-ate-100-mil-toneladas-as-emissoes-de-co2-2/#:~:text=cosm%C3%A9ticos%20at%C3%A9%20itens%20de%20decora%C3%A7%C3%A3o,1%20quilo%20de%20vidro%20novo
//   const fatorAluminio = 16.301 // Alumínio: ~9,0 kg CO₂/kg https://www.hydracorp.com.br/impactos-ambientais-aluminio/#:~:text=9%20toneladas%20de%20CO2%20s%C3%A3o%20economizadas%20por%20tonelada%20de%20alum%C3%ADnio%20reciclado%20(1%20tonelada%20de%20CO2%20equivale%20a%20aproximadamente%204800%20km%20rodados).
//   const fatorAco = 2.032 // Metal (aço predominante): ~2,0 kg CO₂/kg https://www.nucleodoconhecimento.com.br/engenharia-mecanica/consumo-energetico#:~:text=Esse%20valor%20corresponde%20a%202,032%20kg%20a%20menos%20de%20di%C3%B3xido%20de%20carbono%20emitido%20por%20kg%20de%20a%C3%A7o%20produzido
//   const fatorEletronicos = 1.77 // Eletrônicos: ~1,77 kg CO₂/kg https://greeneletron.org.br/blog/estudo-mostra-os-impactos-positivos-da-reciclagem-do-lixo-eletronico-para-o-meio-ambiente/#:~:text=foi%20poss%C3%ADvel%20evitar%20a%20emiss%C3%A3o%20de%20145%20toneladas%20de%20CO2

//   // Cálculo do total de CO₂ evitado (kg)
//   const totalCO2_kg =
//     pesoPapel * fatorPapel +
//     pesoPlastico * fatorPlastico +
//     pesoVidro * fatorVidro +
//     pesoAluminio * fatorAluminio +
//     pesoAco * fatorAco +
//     pesoEletronicos * fatorEletronicos

//   // Conversão para toneladas de CO₂ (1 crédito = 1 tonelada)
//   const totalCO2_t = totalCO2_kg / 1000

//   // Preço do crédito de carbono por tonelada (em R$)
//   const precoPorTonelada = 80.0 // Exemplo: R$ 80,00 por crédito https://credcarbo.com/carbono/qual-o-valor-de-1-credito-de-carbono-tonelada-de-co2-no-mercado-internacional-hoje/#:~:text=No%20Brasil%20os%20valores%20de,sobre%20o%20mercado%20de%20carbono

//   // Valor monetário total dos créditos de carbono gerados (R$)
//   const valorTotalReais = totalCO2_t * precoPorTonelada

//   // Retorna um objeto com os resultados
//   return {
//     co2Evitado_kg: totalCO2_kg.toFixed(2), // CO2 evitado em kg (duas casas decimais)
//     co2Evitado_t: totalCO2_t.toFixed(3), // CO2 evitado em toneladas
//     creditosCarbono: totalCO2_t.toFixed(3), // Créditos de carbono (mesmo número que toneladas)
//     valorMonetario_R$: valorTotalReais.toFixed(2), // Valor em Reais (R$)
//   }
// }
</script>
