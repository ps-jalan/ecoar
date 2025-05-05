<template>
  <q-page class="bg-dark text-white q-pa-md">
    <transition appear enter-active-class="animated fadeIn">
      <q-card class="card-dark q-pa-md">
        <q-card-section>
          <div class="text-title">Meu Perfil</div>
        </q-card-section>

        <q-card-section class="flex flex-center column">
          <q-avatar size="100px" class="q-mb-md">
            <q-img v-if="foto" :src="foto" :loading="loading.value" />
            <q-icon v-else name="person" size="100px" class="text-white" />
          </q-avatar>
          <q-btn flat label="Alterar foto" @click="alterarFoto" class="btn-outline-white q-mb-md" />
          <input
            ref="uploader"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleFileChange"
          />
        </q-card-section>

        <q-card-section>
          <q-input v-model="nome" label="Nome" class="input-dark q-mb-md" filled />
          <q-input v-model="email" label="E-mail" disable class="input-dark q-mb-lg" filled />

          <q-separator spaced dark />

          <q-input
            v-model="celular"
            label="Celular"
            class="input-dark q-mt-lg q-mb-md"
            filled
            label-color="grey-5"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="las la-phone" />
            </template>
          </q-input>
          <q-input
            v-model="cpf"
            label="CPF"
            class="input-dark q-mt-sm"
            filled
            label-color="grey-5"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="las la-id-card" />
            </template>
          </q-input>
          <q-btn
            label="Salvar alterações"
            class="btn-primary full-width q-mt-lg"
            @click="salvarPerfil"
          />
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'
import { Notify } from 'quasar'

const router = useRouter()
const userStore = useUserStore()

const nome = ref('')
const email = ref('')
const celular = ref('')
const cpf = ref('')
const foto = computed(() => userStore.user?.user_metadata?.avatar_url || '')
const uploader = ref(null)
const loading = ref(false)

const alterarFoto = () => {
  uploader.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    loading.value = true
    await userStore.uploadProfilePicture(file)
    loading.value = false
  }
}

onMounted(async () => {
  nome.value = userStore.user_metadata?.name || ''
  email.value = userStore.email
  celular.value = userStore.user_metadata?.phone || ''
  cpf.value = userStore.user_metadata?.cpf || ''
})

async function salvarPerfil() {
  await userStore
    .updateUser({
      data: {
        name: nome.value,
        phone: celular.value,
        cpf: cpf.value,
      },
    })
    .then((result) => {
      if (result.error) {
        Notify.create({
          message: 'Erro ao atualizar perfil',
          color: 'negative',
          position: 'top',
        })
      } else {
        Notify.create({
          message: 'Perfil atualizado com sucesso',
          color: 'positive',
          position: 'top',
        })
      }
    })
}

async function logout() {
  await userStore.logout()
  router.push('/login')
}
</script>
