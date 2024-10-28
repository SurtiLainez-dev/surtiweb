<template>
 <div class="profile__main">
      <div class="profile__main-top pb-80">
        <div class="row align-items-center">
            <div class="col-md-6">
              <div class="profile__main-inner d-flex flex-wrap align-items-center">
<!--                  <div class="profile__main-thumb">-->
<!--                    <img src="/img/users/user-10.jpg" alt="">-->
<!--                    <div class="profile__main-thumb-edit">-->
<!--                        <input id="profile-thumb-input" class="profile-img-popup" type="file">-->
<!--                        <label for="profile-thumb-input"><i class="fa-light fa-camera"></i></label>-->
<!--                    </div>-->
<!--                  </div>-->
                  <div class="profile__main-content">
                    <h4 class="profile__main-title" style="font-size: 22px" v-if="loadData">{{cliente.nombres}} {{cliente.apellidos}}</h4>
                    <h4 class="profile__main-title" style="font-size: 22px" v-else>cargando ...</h4>
                    <p>
                      <span v-if="loadData">{{cliente.identidad}}</span>
                      <span v-else>cargando ...</span>
                    </p>
                    <p v-if="loadData">{{nombre}}</p>
                    <p v-else>cargando ...</p>
                  </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile__main-logout text-sm-end">
                  <nuxt-link class="tp-logout-btn" @click="logUserOut">Cerrar Sesión</nuxt-link>
              </div>
            </div>
        </div>
      </div>
      <div class="profile__main-info">
        <div class="row gx-3">
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-download">{{cantCuentas}}</span>
                        <svg-customers/>
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Cuentas</h4>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-order">{{cantSolicitudes}}</span>
                      <svg-customers/>
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Solicitudes</h4>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <div class="profile__main-info-item">
                  <div class="profile__main-info-icon">
                    <span>
                        <span class="profile-icon-count profile-wishlist">{{cantRecibos}}</span>
                        <svg-customers/>
                    </span>
                  </div>
                  <h4 class="profile__main-info-title">Recibos</h4>
              </div>
            </div>

        </div>
      </div>
 </div>
</template>

<script setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {useAuthStore} from "@/pinia/useAuthStore";
const {logUserOut} = useAuthStore();
import {storeToRefs} from "pinia";
const {cliente, cantRecibos, cantSolicitudes, cantCuentas, loadData} = storeToRefs(useClienteStore())
const {nombre} = useAuthStore();
</script>
