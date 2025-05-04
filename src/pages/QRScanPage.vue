<template>
  <q-page class="bg-dark text-white q-pa-md flex flex-center column">
    <transition appear enter-active-class="animated fadeInUp">
      <div class="text-title text-center q-mb-md">Escaneie o QR Code do saco</div>
    </transition>

    <transition appear enter-active-class="animated fadeIn">
      <div
        id="qr-reader"
        class="q-mb-md"
        style="width: 100%; max-width: 360px; border-radius: 8px; overflow: hidden"
      />
    </transition>

    <q-btn label="Voltar" class="btn-outline-white q-mt-md" to="/nova-solicitacao" />
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

<style scoped>
#qr-reader video {
  border-radius: 12px;
}
</style>
