<template>
  <q-page class="bg-dark text-white q-pa-md">
    <div class="text-title q-mb-md text-center">Escaneie o QR Code do saco</div>

    <div id="qr-reader" class="q-mb-md" style="width: 100%; max-width: 360px; margin: 0 auto" />
    <q-btn label="Voltar" class="btn-outline-white" to="/nova-solicitacao" />
  </q-page>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Html5Qrcode } from 'html5-qrcode'

const router = useRouter()
let qrScanner = null

onMounted(() => {
  const qrRegionId = 'qr-reader'
  qrScanner = new Html5Qrcode(qrRegionId)
  qrScanner
    .start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        qrScanner.stop().then(() => {
          router.push({ path: '/nova-solicitacao', query: { qr: decodedText } })
        })
      },
      (errorMessage) => {
        console.error(errorMessage)
      },
    )
    .catch((err) => {
      console.error('Erro ao iniciar leitor de QR:', err)
    })
})

onBeforeUnmount(() => {
  if (qrScanner) {
    qrScanner.stop().then(() => qrScanner.clear())
  }
})
</script>
