import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from 'stores/user'

export default route(function () {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })

  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    // Tenta recuperar o usuário se ainda não estiver carregado
    if (!userStore.user) {
      await userStore.fetchUser()
    }
    console.log('User:', userStore.user)

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const isAuthPage = ['/login', '/register'].includes(to.path)

    if (requiresAuth && (!userStore.user || !userStore.user.user_metadata.email_verified)) {
      next('/login')
    } else if (userStore.user && isAuthPage) {
      next('/home')
    } else {
      next()
    }
  })

  return router
})
