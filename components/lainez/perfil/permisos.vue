<template>
  <div>
    <h3 class="profile__info-title">Permisos Para Circular sin Placa</h3>
    <span>*Esta sección solo es para clientes que compraron una motocicleta</span>
    <div class="profile__info-content">
      <div v-if="loadData">
        <div class="profile__ticket table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Modelo</th>
              <th scope="col">Chasis</th>
              <th scope="col">Cod.</th>
              <th scope="col">F. Vencimiento</th>
              <th scope="col">Ver</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in Permisos">
                <td>{{item.modelo}}</td>
                <td>{{item.chasis}}</td>
                <td>{{item.permiso}}</td>
                <td>{{parsearFecha(item.fecha_vencimiento)}}</td>
                <td><span style="color: #003eff; cursor: pointer" @click="solicitarClave(item)">Imprimir</span></td>
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
import {toast} from "vue3-toastify";
const {loadData, Permisos} = storeToRefs(useClienteStore());
import { useCartStore } from "@/pinia/useCartStore";
const loadPage = useCartStore()
const axios = useNuxtApp().$axios;

const parsearFecha = (fecha:string):string =>{
  let fecha1 = fecha.split('-');
  return fecha1[2]+'/'+fecha1[1]+'/'+fecha1[0]
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
  window.open(url+'documentos/permiso_s_placa/usuario=SURTI-CREDITOS/permiso='+data.permiso+'/'+clave,'_blank')
}
</script>

<style scoped>

</style>
