<template>
  <div>
    <div v-if="vista === 1">
      <h3 class="profile__info-title">Cuentas Asociadas</h3>
      <div class="profile__info-content">
        <!-- form start -->
        <div v-if="loadData">
          <div class="profile__ticket table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Cod.</th>
                <th scope="col">Saldo Actual</th>
                <th scope="col">Estado</th>
                <th scope="col">Sucursal</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in Cuentas" @click="cargarPagos(item)">
                <td v-if="item.tipo_venta === 1">Contado</td>
                <td v-else-if="item.tipo_venta === 2">Credito</td>
                <td>{{item.cod}}</td>
                <td>L. {{Intl.NumberFormat().format(item.saldo_actual)}}</td>
                <td>
                  <span v-if="item.estado === 1">Al Dia</span>
                  <span v-else-if="item.estado === 2">Mora</span>
                  <span v-else-if="item.estado === 3">Cancelado</span>
                </td>
                <td>{{item.sucursal}}</td>
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
      <h3 class="profile__info-title">Datos de la Cuenta # {{cuenta.cod}}</h3>
      <div class="profile__info-content">
        <!-- form start -->
        <div>
          <div class="profile__ticket table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Marca</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Modelo</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Articulo</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Serie</th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="articulos && articulos.length > 0" v-for="item in articulos">
                  <td style="font-size: 12px !important; padding: 5px !important;">{{item.marca}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">{{item.modelo}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">{{item.nombre_articulo}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">{{item.serie_fabricante}}</td>
                </tr>
                <tr v-else><td colspan="4">Para conocer mas información del artículo puedes solicitarlo a sac@grupolainez.com</td></tr>
              </tbody>
            </table>
          </div>
          <div class="profile__ticket table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Fecha de Pago</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Detalle</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Saldo Inicial</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Mora</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Saldo Actual</th>
                <th style="font-size: 12px !important; padding: 5px !important;" scope="col">Estado</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="item in pagos">
                  <td style="font-size: 12px !important; padding: 5px !important;">{{parseFecha(item.fecha_pago)}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">{{item.detalle}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">L. {{Intl.NumberFormat().format(item.pago_inicial)}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">L. {{Intl.NumberFormat().format(item.mora)}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">L. {{Intl.NumberFormat().format(item.saldo_actual)}}</td>
                  <td style="font-size: 12px !important; padding: 5px !important;">
                    <span style="color: blue" v-if="item.estado === 1">Al Dia</span>
                    <span style="color: red" v-else-if="item.estado === 2">Mora</span>
                    <span style="color: green" v-else-if="item.estado === 3">Cancelado</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" style="font-size: 12px !important; padding: 5px !important; text-align: center">----- Fin de Datos -----</td>
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

<script setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {storeToRefs} from "pinia";
import {ref, onMounted} from 'vue'

const {loadData, Cuentas} = storeToRefs(useClienteStore());
const vista = ref<number>(1);
const pagos = ref<[]>([]);
const cuenta = ref<{}>({});
const articulos = ref<[]>([])
const axios = useNuxtApp().$axios;
onMounted(()=>{
  vista.value = 1;
})
const cargarPagos = (data:any) =>{
  cuenta.value = data;
  vista.value = 2;
  // @ts-ignore
  axios.get('user/tabla_pagos/'+data.cod,{
    headers: {
      'Authorization': 'Bearer ' + useCookie('token').value
    }
  }).then((res:any)=>{
    vista.value     = 3;
    pagos.value     = res.data.pagos;
    articulos.value = res.data.articulos;
  })
};
const parseFecha  = (fecha:string):string =>{
  let f = fecha.split('-');
  return f[2]+'/'+f[1]+'/'+f[0];
}
</script>

<style scoped>

</style>
