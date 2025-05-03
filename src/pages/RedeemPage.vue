<template>
  <q-page class="bg-dark text-white q-pa-md">
    <q-card class="card-dark">
      <q-card-section>
        <div class="text-title">Trocar Créditos de Carbono</div>
        <div class="text-body">Escolha uma opção de resgate</div>
      </q-card-section>

      <q-card-section>
        <q-list separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Resgatar em dinheiro (via PIX)</q-item-label>
              <q-item-label caption>Valor mínimo: R$ 10,00</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="attach_money" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Desconto em transporte público</q-item-label>
              <q-item-label caption>Credite em seu Cartão VEM</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="directions_bus" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
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
        <q-btn to="/creditos" flat label="Voltar" color="secondary" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
