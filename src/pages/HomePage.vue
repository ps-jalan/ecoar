<template>
  <q-page class="bg-dark text-white q-pa-md">
    <div class="text-title q-mb-lg">Bem-vindo(a) ao Ecoar</div>

    <q-card class="card-dark q-mb-md">
      <q-card-section>
        <div class="text-subtitle1">Coleta atual</div>
        <div class="text-h6">1 coleta a caminho</div>
      </q-card-section>
    </q-card>

    <q-card class="card-dark q-mb-md">
      <q-card-section>
        <div class="text-subtitle1">Créditos de carbono</div>
        <div class="text-h6">12.4 kg CO₂</div>
      </q-card-section>
    </q-card>

    <q-btn
      to="/nova-solicitacao"
      label="Nova coleta"
      class="btn-primary full-width q-mt-md q-pa-sm"
    />
    <q-btn
      to="/creditos"
      label="Ver carteira"
      class="btn-outline-white full-width q-mt-sm q-pa-sm"
    />
  </q-page>
</template>

<script setup></script>
