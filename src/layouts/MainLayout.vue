<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark text-white" style="max-width: 960px; margin: auto">
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

    <q-footer class="bg-dark" style="max-width: 960px; margin: auto">
      <q-tabs align="justify" class="text-white" dense>
        <q-route-tab
          to="/home"
          icon="las la-home"
          label="Início"
          class="q-pa-sm text-title"
          active-class="text-primary"
        />
        <q-route-tab
          to="/nova-solicitacao"
          icon="las la-plus-circle"
          label="Nova Coleta"
          class="q-pa-sm text-title"
          active-class="text-primary"
          active-icon="las la-plus-leaf"
        />
        <q-route-tab
          to="/creditos"
          icon="las la-leaf"
          label="Créditos"
          class="q-pa-sm text-title"
          active-class="text-primary"
        />
        <q-route-tab
          to="/perfil"
          icon="las la-user"
          label="Perfil"
          class="q-pa-sm text-title"
          active-class="text-primary"
        />
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
