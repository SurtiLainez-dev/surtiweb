<template>
<div>
  <breadcrumb-4 title="Validación de Documento Qr" :subtitle="Qr"/>


  <section class="tp-order-area pb-160" v-if="load">
    <div class="container">
      <div class="tp-order-inner">
        <div class="row gx-0">
          <div class="col-lg-12">
            <div class="profile__info" style="padding: 25px">
              <div class="profile__info-content">

                <div class="row">
                  <div class="col-lg-5">

                    <div class="tp-order-info-list">
                      <ul>
                        <li><strong>Datos del Documento</strong></li>
                        <li class="tp-order-info-list-desc">
                          <p><span>Referencia</span></p>
                          <span>{{qr?.referencia}}</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <span>Este es un documento valido de Surtidora Lainez</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <span>{{qr?.detalle}}</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <p><span>Autor</span></p>
                          <span>{{qr?.autor}}</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <p><span>Cantidades Verificados</span></p>
                          <span>{{qr?.cant_verificado + 1}}</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <p><span>Tipo de Documento</span></p>
                          <span>{{qr?.tipo}}</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <p><span>Codigo de Verificación</span></p>
                          <span>{{qr?.token}}</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <span>La vista del documento asociado a este Qr esta a la derecha en computadora. Desde el celular se encuentra en la parte superior.</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <span>Por favor valida la información del Qr con el documento real para verificar que se el mismo. Sino es la misma información, probablemente
                          este Qr fué alterado maliciosamente y este documento fué falsificado. Por favor reportalo</span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <span><nuxt-link style="color:blue" to="/surti/validar_documento_qr">Volver a validar otro Codigo Qr</nuxt-link></span>
                        </li>
                        <li class="tp-order-info-list-desc">
                          <span><nuxt-link style="color:blue" to="/">Volver al Inicio</nuxt-link></span>
                        </li>
                      </ul>
                    </div>

                  </div>
                  <div class="col-lg-7">
                    <iframe class="m-2"
                            width="100%"
                            height="100%"
                            type="application/pdf"

                            :src="url">
                    </iframe>
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
import {ref} from "vue"

const url = ref<string>('');
const qr = ref<null | object>(null);
const route = useRoute();
const Qr    = route.params.id;
const axios = useNuxtApp().$axios;
const load  = ref<boolean>(false);



onMounted(()=>{
  // consultarQr();
})

const consultarQr = () =>{
  axios.get('qr='+Qr).then((res:reqInterface)=>{
    url.value  = 'https://grupolainez.com/api/documentos/'+res.data.doc.url_verificacion+res.data.token;
    qr.value   = res.data.doc;
    load.value = true;
  }).catch(()=>{
    toast.error('No se encontró el documento')
  })
}
interface reqInterface{
  data: redDataInterface
}
interface redDataInterface{
  doc: docInterface,
  msj: string,
  token: string
}
interface docInterface{
  autor: string,
  cant_verificado: number,
  created_at: string,
  detalle: string,
  id: number,
  referencia: string,
  tipo: string,
  token: string,
  url_verificacion: string
}
</script>

<style scoped>

</style>
