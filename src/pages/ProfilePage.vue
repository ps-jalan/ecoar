<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Meu Perfil</div>
        </q-card-section>

        <q-card-section class="flex flex-center column">
          <q-avatar size="100px" class="q-mb-md">
            <img :src="foto || 'https://cdn.quasar.dev/img/avatar.png'" />
          </q-avatar>
          <q-btn flat label="Alterar foto" @click="alterarFoto" class="btn-outline-white q-mb-md" />
        </q-card-section>

        <q-card-section>
          <q-input v-model="nome" label="Nome" class="input-dark q-mb-md" filled />
          <q-input v-model="email" label="E-mail" disable class="input-dark q-mb-md" filled />
          <q-btn label="Salvar alterações" class="btn-primary full-width" @click="salvarPerfil" />
        </q-card-section>

        <q-separator dark class="q-my-md" />

        <q-card-section>
          <q-btn
            label="Sair da conta"
            color="negative"
            flat
            class="full-width text-negative"
            @click="logout"
          />
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'boot/supabase'
import { Notify } from 'quasar'

const nome = ref('')
const email = ref('')
const foto = ref('')
const router = useRouter()

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    nome.value = user.user_metadata?.nome || ''
    email.value = user.email
    foto.value = user.user_metadata?.avatar_url || ''
  }
})

async function salvarPerfil() {
  const updates = {
    data: {
      nome: nome.value,
      avatar_url: foto.value,
    },
  }
  const { error } = await supabase.auth.updateUser(updates)
  if (error) {
    Notify.create({ type: 'negative', message: error.message })
  } else {
    Notify.create({ type: 'positive', message: 'Perfil atualizado!' })
  }
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/login')
}

function alterarFoto() {
  const url = prompt('Informe a URL da nova foto de perfil')
  if (url) foto.value = url
}
</script>
