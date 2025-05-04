<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Trocar Créditos de Carbono</div>
          <div class="text-subtitle2">Escolha uma opção de resgate</div>
        </q-card-section>

        <q-separator dark class="q-my-sm" />

        <q-card-section>
          <q-list separator class="rounded-borders text-white">
            <q-item clickable v-ripple class="q-my-xs">
              <q-item-section>
                <q-item-label>Resgatar em dinheiro (via PIX)</q-item-label>
                <q-item-label caption>Valor mínimo: R$ 10,00</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="attach_money" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple class="q-my-xs">
              <q-item-section>
                <q-item-label>Desconto em transporte público</q-item-label>
                <q-item-label caption>Credite em seu Cartão VEM</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="directions_bus" />
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple class="q-my-xs">
              <q-item-section>
                <q-item-label>Desconto em farmácias e mercados</q-item-label>
                <q-item-label caption>Parcerias com redes locais</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="local_offer" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn to="/creditos" label="Voltar" class="btn-outline-white" />
        </q-card-actions>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
// Lógica de resgate pode ser integrada posteriormente via API externa
</script>
