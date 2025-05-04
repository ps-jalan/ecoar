<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Registrar nova coleta</div>
          <div class="text-subtitle2">Escaneie ou digite o QR Code do saco e insira os dados</div>
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <q-btn
            class="btn-primary full-width"
            icon="qr_code_scanner"
            label="Escanear QR Code"
            @click="openQRScan"
          />

          <q-input
            v-model="qrCode"
            label="QR Code (ou digite manualmente)"
            class="input-dark q-mt-md"
            filled
          />

          <q-select
            v-model="tipoMaterial"
            :options="tipos"
            label="Tipo de material"
            class="input-dark q-mt-md"
            filled
          />

          <q-input
            v-model.number="pesoKg"
            type="number"
            label="Peso (kg)"
            class="input-dark q-mt-md"
            filled
          />

          <q-input
            v-model="observacoes"
            type="textarea"
            label="Observações (opcional)"
            autogrow
            class="input-dark q-mt-md"
            filled
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Salvar coleta"
            class="btn-primary"
            @click="salvarColeta"
            :disable="!qrCode || !tipoMaterial || !pesoKg"
          />
        </q-card-actions>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from 'boot/supabase'

const router = useRouter()
const route = useRoute()

const qrCode = ref(null)
const tipoMaterial = ref(null)
const pesoKg = ref(null)
const observacoes = ref('')

const tipos = ['Papel', 'Plástico', 'Metal', 'Vidro', 'Eletrônicos']

function openQRScan() {
  router.push('/qrcode')
}

async function salvarColeta() {
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
    .insert([
      {
        user_id: user.id,
        qr_code: qrCode.value,
        tipo: tipoMaterial.value,
        peso: pesoKg.value,
        observacoes: observacoes.value,
        status: 'pendente',
      },
    ])
    .select()
    .single()

  if (error) {
    alert('Erro ao salvar coleta: ' + error.message)
  } else {
    router.push(`/status/${data.id}`)
  }
}

onMounted(() => {
  const qrFromQuery = route.query.qr
  if (qrFromQuery) {
    qrCode.value = qrFromQuery
  }
})
</script>
