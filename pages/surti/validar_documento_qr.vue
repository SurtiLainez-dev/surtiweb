<template>
  <div>
    <breadcrumb-4 title="Validar Documento Qr" subtitle="Validación de Documentos"/>

    <section class="tp-order-area pb-160" >
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Nueva Consulta</h3>
                <div class="profile__info-content">


                  <div>
                    <div class="row">
                      <div class="col-xxl-12 col-md-12">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="text"
                                v-model="state.token"
                                name="Codigo del Qr"
                                placeholder="Escribir Codigo del Qr"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__btn">
                          <button v-if="!state.sendReq" @click="onSubmitQr"  class="tp-btn">Validar Documento</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {toast} from "vue3-toastify";

useSeoMeta({ title: "Validar Documentos Qr - Lainez Online" });
const state = reactive({
  token: '',
  sendReq: false
})
const onSubmitQr = () =>{
  if (state.token && state.token.length === 15){
    navigateTo('/surti/qr/'+state.token);
  }else
    toast.error('El codigo del Qr tiene que ser de 15 carácteres')
}
</script>

<style scoped>

</style>
