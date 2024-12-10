<template>
  <div>
    <h3 class="profile__info-title">Constancias de Estado de Cuentas</h3>
    <div class="profile__info-content">
      <!-- form start -->
      <div v-if="loadData">
        <div class="profile__ticket table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Creado</th>
              <th scope="col">Codigo</th>
              <th scope="col">Para</th>
              <th scope="col">Estado</th>
              <th scope="col">Ver</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in Finiquitos">
              <td>{{parsearFecha(item.created_at)}}</td>
              <td>{{item.cod}}</td>
              <td>
                <span v-if="item.para">{{item.para}}</span>
                <span v-else>...</span>
              </td>
              <td>{{item.estado}}</td>
              <td>
                <span @click="solicitarClave(item)" style="color: blue; cursor: pointer">Ver</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <span v-else>cargando ...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {storeToRefs} from "pinia";
const {loadData, Finiquitos} = storeToRefs(useClienteStore());
import {useAuthStore} from "@/pinia/useAuthStore";
import { useCartStore } from "@/pinia/useCartStore";
const loadPage = useCartStore()
const axios = useNuxtApp().$axios;
import { toast } from "vue3-toastify";
const {nombre} = useAuthStore();

const parsearFecha = (fecha:string):string =>{
  let fecha1 = fecha.split('T');
  let fecha2 = fecha1[0].split(' ');
  let fecha3 = fecha2[0].split('-')
  return fecha3[2]+'/'+fecha3[1]+'/'+fecha3[0]
}

const solicitarClave = (data:any) =>{
  loadPage.switchLoadingPage();
  axios.post('user/solicitar_clave',{},{
    headers: {
      'Authorization': 'Bearer ' + useCookie('token').value
    }
  }).then((res:any)=>{
    loadPage.switchLoadingPage();
    verDoc(data, res.data.clave);
  }).cath(()=>{
    loadPage.switchLoadingPage();
    toast.error(`Error al cargar el token para el documento`);
  }).catch(()=>{
    loadPage.switchLoadingPage();
    toast.error(`Hubo un error en el servidor`);
  })
}

const verDoc = (data:any, clave:string) =>{
  let url = axios.defaults.baseURL
  window.open(url+'documentos/constancia_estado_cuentas/usuario=SURTI-CREDITOS/cod='+data.cod+'/'+clave,'_blank')
}
</script>

<style scoped>

</style>
