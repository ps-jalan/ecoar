<template>
  <q-page class="q-pa-md flex flex-center bg-dark text-white">
    <transition appear enter-active-class="animated fadeInUp">
      <div>
        <q-card flat bordered class="card-dark q-pa-lg full-width" style="min-width: 320px">
          <div class="text-title text-center q-mb-md">Criar conta</div>
          <q-input
            v-model="nome"
            label="Nome Completo"
            class="input-dark q-my-lg"
            filled
            label-color="grey-5"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="las la-signature" />
            </template>
          </q-input>

          <q-separator spaced dark />

          <q-input
            v-model="email"
            label="E-mail"
            icon="las la-envelope"
            class="input-dark q-mt-lg"
            filled
            label-color="grey-5"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="las la-envelope" />
            </template>
          </q-input>
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            class="input-dark q-mt-sm q-mb-lg"
            filled
            label-color="grey-5"
            color="primary"
            hint="Mínimo 8 caracteres com letras e números."
          >
            <template v-slot:prepend>
              <q-icon name="las la-key" />
            </template>
          </q-input>

          <q-btn
            label="Cadastrar"
            class="btn-primary full-width q-mt-lg q-mb-sm q-pa-sm"
            @click="register"
          />
        </q-card>

        <q-btn
          to="/login"
          label="Voltar para o login"
          icon="las la-angle-left"
          flat
          class="full-width q-mt-lg q-pa-sm text-uppercase"
        />
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'

const nome = ref('')
const email = ref('')
const senha = ref('')

const router = useRouter()
const userStore = useUserStore()

const register = async () => {
  const result = await userStore.registerWithEmail(email.value, senha.value, nome.value)
  if (result.success) {
    router.push('/login')
  }
}

// const register = async () => {
//   const { error } = await supabase.auth.signUp({
//     email: email.value,
//     password: senha.value,
//     options: {
//       data: {
//         name: nome.value, // isso vai para user_metadata.name
//       },
//     },
//   })

//   if (error) {
//     console.error(error.message)
//   } else {
//     Notify.create({
//       message: 'Verifique seu email para concluir o cadastro.',
//       color: 'positive',
//       position: 'top',
//     })
//     router.push('/login')
//   }
// }
</script>
