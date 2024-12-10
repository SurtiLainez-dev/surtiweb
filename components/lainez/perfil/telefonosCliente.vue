<template>
<div>
  <h3 class="profile__info-title">Telefonos y Referencias</h3>
  <div class="profile__info-content">
    <!-- form start -->
    <div v-if="loadData">
      <div class="profile__ticket table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Detalle</th>
            <th scope="col">Área</th>
            <th colspan="2" scope="col">Número</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in Telefonos">
              <td>{{item.detalle}}</td>
              <td>+{{item.area}}</td>
              <td colspan="2">{{item.num}}</td>
            </tr>
            <tr>
              <td>
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input
                        type="text"
                        v-model="state.detalle"
                        placeholder="Dueño del número"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input
                        type="text"
                        v-model="state.area"
                        placeholder="Cod. Area"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input
                        type="text"
                        v-model="state.num"
                        placeholder="Número"
                    />
                  </div>
                </div>
              </td>
              <td>
<!--                <button  class="tp-login-btn w-100 disabled">Añadir</button>-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span v-else>cargando ...</span>
    <!-- form end -->
  </div>
</div>
</template>

<script setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {storeToRefs} from "pinia";
const {loadData, Telefonos} = storeToRefs(useClienteStore());
import {useAuthStore} from "@/pinia/useAuthStore";
const {addTelefono} = useClienteStore();
const {setLoading, loading} = useAuthStore();
const axios = useNuxtApp().$axios;
const state = reactive({
  num: '',
  detalle: '',
  area: ''
})
const addTel = () =>{
  setLoading();

}
</script>

