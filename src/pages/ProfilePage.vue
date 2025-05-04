<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Meu Perfil</div>
        </q-card-section>

        <q-card-section class="flex flex-center column">
          <q-avatar size="100px" class="q-mb-md">
            <img v-if="foto" :src="foto" />
            <q-icon v-else name="person" size="100px" class="text-white" />
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
import { useUserStore } from 'stores/user'

const router = useRouter()
const userStore = useUserStore()

const nome = ref('')
const email = ref('')
const foto = ref('')

onMounted(async () => {
  const user = await userStore.fetchUser()
  if (user) {
    nome.value = user.user_metadata?.nome || ''
    email.value = user.email
    foto.value = user.user_metadata?.avatar_url || ''
  }
})

async function salvarPerfil() {
  await userStore.updateUser({
    data: {
      nome: nome.value,
      avatar_url: foto.value,
    },
  })
}

async function logout() {
  await userStore.logout()
  router.push('/login')
}

function alterarFoto() {
  const url = prompt('Informe a URL da nova foto de perfil')
  if (url) foto.value = url
}
</script>
