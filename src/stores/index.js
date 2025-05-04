import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

export default function () {
  const pinia = createPinia()
  pinia.use(piniaPersistedstate)
  return pinia
}
