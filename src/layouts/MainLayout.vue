<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark text-white">
    <q-page-container>
      <q-inner-loading
        :showing="loadingStore.isLoading"
        label="Carregando..."
        color="primary"
        label-class="text-white"
        dark
      />
      <router-view />
    </q-page-container>

    <q-footer class="bg-dark">
      <q-tabs align="justify" class="text-white" dense>
        <q-route-tab to="/home" icon="home" label="Início" active-color="primary" />
        <q-route-tab
          to="/nova-solicitacao"
          icon="add_circle"
          label="Nova Coleta"
          active-color="primary"
        />
        <q-route-tab to="/creditos" icon="eco" label="Créditos" active-color="primary" />
        <q-route-tab to="/perfil" icon="person" label="Perfil" active-color="primary" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useLoadingStore } from 'stores/loading'
const loadingStore = useLoadingStore()
</script>

<style scoped>
img {
  filter: brightness(0) invert(1);
}
</style>
