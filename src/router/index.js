import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { supabase } from 'boot/supabase'
import { useUserStore } from 'stores/user'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    if (!userStore.user) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userStore.user = user
    }

    if (to.meta.requiresAuth && !userStore.user) {
      next('/login')
    } else {
      next()
    }
  })

  return Router
})
