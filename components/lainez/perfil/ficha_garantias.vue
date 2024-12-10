<template>
  <div>
    <div v-if="vista === 1">
      <h3 class="profile__info-title">Fichas de Garantias Asociadas</h3>
      <div class="profile__info-content">
        <!-- form start -->
        <div v-if="loadData">
          <div class="profile__ticket table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Cod. Ficha</th>
                <th scope="col">Cod. Cuenta</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="item in Garantias" @click="cargarComentarios(item)">
                  <td>{{item.ficha}}</td>
                  <td>{{item.cod}}</td>
                  <td>{{item.estado}}</td>
                  <td>{{parsearFecga(item.created_at)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <span v-else>cargando ...</span>
        <!-- form end -->
      </div>
    </div>

    <div v-else-if="vista === 2">
      <h3 class="profile__info-title">Cargando datos ... </h3>
    </div>

    <div v-else-if="vista === 3">
      <a @click="vista = 1">Volvar Atras</a>
      <h3 class="profile__info-title">Datos de la Ficha de Garantia # {{Ficha.ficha}}</h3>
      <div class="profile__info-content">
        <!-- form start -->
        <div>
          <div class="profile__ticket table-responsive">
            <table class="table">
              <thead><tr><th style="font-size: 12px !important; padding: 5px !important;" scope="col">Estado</th></tr></thead>
              <tbody><tr><td style="font-size: 12px !important; padding: 5px !important;">{{Ficha.estado}}</td></tr></tbody>
              <thead><tr><th style="font-size: 12px !important; padding: 5px !important;" scope="col">Comentario del Cliente</th></tr></thead>
              <tbody><tr><td style="font-size: 12px !important; padding: 5px !important;">{{Ficha.comentario_cliente}}</td></tr></tbody>
              <thead><tr><th style="font-size: 12px !important; padding: 5px !important;" scope="col">Comentario del Inicial del Usuario</th></tr></thead>
              <tbody><tr><td style="font-size: 12px !important; padding: 5px !important;">{{Ficha.comentario_inicial_usuario}}</td></tr></tbody>
            </table>
          </div>
          <div class="profile__ticket table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Comentario</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Archivo/Foto</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Fecha</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="item in comentarios">
                  <td style="font-size: 12px !important; padding: 5px !important;">{{item.comentario}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">
                    <a v-if="item.file" @click="verDoc(item.file)" style="color:blue !important;">Ver Archivo/Foto</a>
                  </td>
                  <td style="font-size: 12px !important; padding: 5px !important;" >{{parsearFecga(item.created_at)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- form end -->
      </div>
    </div>
  </div>
</template>

<script  setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {storeToRefs} from "pinia";
import {ref, onMounted} from 'vue'
const comentarios = ref<[]>([])
const Ficha = ref<{}>({})
const axios = useNuxtApp().$axios;
const {loadData, Garantias} = storeToRefs(useClienteStore());
const vista = ref<number>(1);

const parsearFecga = (fecha:string):string =>{
  let fecha1 = fecha.split('T');
  let fecha2 = fecha1[0].split(' ');
  let fecha3 = fecha2[0].split('-')
  return fecha3[2]+'/'+fecha3[1]+'/'+fecha3[0]
}
const cargarComentarios = (data:any) =>{
  vista.value = 2;
  Ficha.value = data;
  // @ts-ignore
  axios.get('user/comentarios_ficha/'+data.ficha,{
    headers: {
      'Authorization': 'Bearer ' + useCookie('token').value
    }
  }).then((res:any)=>{
    vista.value       = 3;
    comentarios.value = res.data.comentarios;
  })
}

const verDoc = (url:string) =>{
  axios.post('leer_documento',{ubicacion:url},{
    headers: {
      'Authorization': 'Bearer ' + useCookie('token').value
    }
  }).then((res:any)=>{
    window.open(res.data.url,'_blank')
  })
}
</script>

<style scoped>

</style>
