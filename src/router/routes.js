// src/router/routes.js

const routes = [
  // Público
  {
    path: '/',
    component: () => import('pages/LoginPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
    meta: { layout: 'empty' },
  },
  {
    path: '/otp',
    component: () => import('pages/OTPPage.vue'),
    meta: { layout: 'empty' },
  },

  // Funcionalidades principais (requerem login)
  {
    path: '/home',
    component: () => import('pages/HomePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/nova-solicitacao',
    component: () => import('pages/NewRequestPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/qrcode',
    component: () => import('pages/QRScanPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/status/:id',
    component: () => import('pages/RequestStatusPage.vue'),
    meta: { requiresAuth: true },
  },

  // Perfil e recompensas
  {
    path: '/creditos',
    component: () => import('pages/CreditsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/resgatar',
    component: () => import('pages/RedeemPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/perfil',
    component: () => import('pages/ProfilePage.vue'),
    meta: { requiresAuth: true },
  },

  // Rota 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
