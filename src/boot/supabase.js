// src/boot/supabase.js
import { boot } from 'quasar/wrappers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vrkdrkcfirpvsfydvhwa.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya2Rya2NmaXJwdnNmeWR2aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzY5OTEsImV4cCI6MjA2MTg1Mjk5MX0.bPZ-mWt-1Ij9J0I_iiaaOtMi7JSitP-i5WUWoZBpZX0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default boot(({ app }) => {
  app.config.globalProperties.$supabase = supabase
})
