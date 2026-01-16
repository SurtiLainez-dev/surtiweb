<template>
  <div class="wrap">
    <div class="card">
      <div class="title">Compartir ubicación</div>

      <div v-if="loadingValidate" class="muted">
        Validando enlace...
      </div>

      <div v-else-if="invalid" class="error">
        {{ errorMsg }}
      </div>

      <div v-else>
        <div class="muted">
          Presiona el botón y permite el permiso de ubicación. Se guardará automáticamente.
        </div>

        <button class="btn" :disabled="loadingCapture" @click="capturarUbicacion">
          {{ loadingCapture ? 'Guardando...' : 'Compartir mi ubicación' }}
        </button>

        <div v-if="successMsg" class="ok">
          {{ successMsg }}
        </div>

        <div v-if="errorMsg && !invalid" class="error">
          {{ errorMsg }}
        </div>

        <div class="small muted" v-if="expiresAt">
          Enlace válido hasta: <b>{{ expiresAt }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {toast} from "vue3-toastify";

type ValidateResponse = {
  ok: boolean
  msg?: string
  expires_at?: string
  dir_id?: number
}

type CaptureResponse = {
  ok: boolean
  msg?: string
}

const route = useRoute()
const axios = useNuxtApp().$axios as any

const loadingValidate = ref(true)
const loadingCapture = ref(false)
const invalid = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const expiresAt = ref<string | null>(null)

const getToken = (): string => {
  const token = String(route.params.token || '')
  return token
}

const validarToken = async (): Promise<void> => {
  loadingValidate.value = true
  invalid.value = false
  errorMsg.value = ''
  successMsg.value = ''
  expiresAt.value = null

  const token = getToken()
  const url = `/dir-token/${token}`

  try {
    const res = await axios.get(url)

    const data = res?.data as ValidateResponse

    if (!data || data.ok !== true) {
      invalid.value = true
      errorMsg.value = data?.msg || 'Token inválido'
      return
    }

    expiresAt.value = data.expires_at || null
  } catch (e: any) {

    invalid.value = true
    errorMsg.value = e?.response?.data?.msg || e?.message || 'No se pudo validar el enlace'
  } finally {
    loadingValidate.value = false
  }
}

const capturarUbicacion = async (): Promise<void> => {
  errorMsg.value = ''
  successMsg.value = ''
  loadingCapture.value = true

  const token = getToken()
  const url = `/dir-token/${token}/capturar`

  try {

    const pos: GeolocationPosition = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Geolocalización no soportada'))

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      })
    })

    const lat = pos.coords.latitude
    const lng = pos.coords.longitude
    const accuracy = pos.coords.accuracy

    const payload = { lat, lng }

    const res = await axios.post(url, payload)

    const data = res?.data as CaptureResponse

    if (data && data.ok === true) {
      successMsg.value = data.msg || '✅ Ubicación guardada. Ya puedes cerrar esta página.'
      toast.success(`Datos guardado exitosamente`);
      window.close()
    } else {
      errorMsg.value = data?.msg || 'No se pudo guardar la ubicación'
    }
  } catch (e: any) {

    // GPS errors
    if (typeof e?.code !== 'undefined') {
      if (e.code === 1) errorMsg.value = 'Permiso de ubicación denegado.'
      else if (e.code === 2) errorMsg.value = 'No se pudo obtener ubicación.'
      else if (e.code === 3) errorMsg.value = 'Tiempo de espera agotado.'
      else errorMsg.value = 'Error obteniendo ubicación.'
    } else {
      errorMsg.value = e?.response?.data?.msg || e?.message || 'Error al capturar ubicación'
    }
  } finally {
    loadingCapture.value = false
  }
}

onMounted(async () => {
  await validarToken()
})
</script>



<style scoped>
.wrap{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:16px;
  background:#f6f7fb;
}
.card{
  width:min(560px, 100%);
  background:#fff;
  border-radius:16px;
  padding:18px;
  box-shadow:0 10px 30px rgba(0,0,0,.08);
}
.title{
  font-size:20px;
  font-weight:800;
  margin-bottom:10px;
}
.muted{
  color:#444;
  margin-bottom:12px;
  line-height:1.35;
}
.small{ font-size:13px; margin-top:12px; }
.btn{
  width:100%;
  padding:12px 14px;
  border:0;
  border-radius:12px;
  background:#111;
  color:#fff;
  font-weight:800;
  cursor:pointer;
}
.btn:disabled{
  opacity:.6;
  cursor:not-allowed;
}
.ok{
  margin-top:12px;
  font-weight:700;
  color:#0f7b2d;
}
.error{
  margin-top:12px;
  font-weight:700;
  color:#b00020;
}
</style>
