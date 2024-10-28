<template>
  <div>
      <!-- profile area start -->
      <profile-area/>
      <!-- profile area end -->
  </div>
</template>

<script setup lang="ts">
// import {resMisDatos} from "@/types/lainez/clienteInterfaces";

const axios = useNuxtApp().$axios;
import {useClienteStore} from "@/pinia/useClienteStore";
const {setDatosCliente} = useClienteStore();
definePageMeta({
  middleware: 'auth' // this should match the name of the file inside the middleware directory
})
useSeoMeta({ title: "Mi Perfil - Surti Lainez Online" });

onMounted(()=>{
  cargarDatos();
})

const cargarDatos = () =>{
  axios.get('/user/mis_datos',{
    headers: {
      'Authorization': 'Bearer ' + useCookie('token').value
    }
  }).then((res)=>{
    setDatosCliente(res.data)
  })
}

// export interface resDataMisDatos {
//   data: resMisDatos
// }
</script>
