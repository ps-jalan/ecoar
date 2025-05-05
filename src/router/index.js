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

    console.log('User:', userStore.user)

    // Tenta recuperar o usuário se ainda não estiver carregado
    if (!userStore.user) {
      await userStore.fetchUser()
    }

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const isAuthPage = ['/login', '/register', '/'].includes(to.path)
    const isVerified = userStore.user?.user_metadata.email_verified || false

    if (requiresAuth && !isVerified) {
      if (from.path !== '/login') next('/login')
    } else if (userStore.user && isAuthPage) {
      if (from.path !== '/home') next('/home')
    } else {
      next()
    }
  })

  return router
})
