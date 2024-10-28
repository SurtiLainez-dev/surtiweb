<template>
  <div>
    <breadcrumb-4 title="Consulta de Garantia" subtitle="Consulta de Garantia"/>

    <section class="tp-order-area pb-160" >
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Estado Ficha de Garantia</h3>
                <div class="profile__info-content">
                  <!-- form start -->

                  <div >
                    <div class="row">
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <Field
                                type="text"
                                :rules="validarIdentidad"
                                v-model="state.identidad"
                                name="identidad"
                                placeholder="Identidad del Cliente"/>
                            <span><svg-user-3/></span>
                          </div>
                          <ErrorMessage name="identidad" />
                        </div>
                      </div>
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <Field
                                type="text"
                                v-model="state.garantia"
                                name="ficha"
                                :rules="validarFicha"
                                placeholder="# de Solicitúd/Ficha de Garantía"/>
                            <span></span>
                          </div>
                          <ErrorMessage name="ficha" />
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__btn">
                          <button v-if="!state.sendRes"  class="tp-btn" @click="onSubmitConsulta">Consultar Estado</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p>*Si deseas saber mas información sobre tu fucha de garantía, por favor inicia sesión a nuestra
                  plataforma</p>

                  <div class="profile__ticket table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th scope="col">Identidad</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Artículo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Estado</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in state.Fichas">
                          <td>{{item.identidad}}</td>
                          <td>{{item.nombres}} {{item.apellidos}}</td>
                          <td>{{item.modelo}}</td>
                          <td>{{item.nombre_articulo}}</td>
                          <td>{{item.serie}}</td>
                          <td>{{item.estado}}</td>
                        </tr>
                      </tbody>
                    </table>
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
import {useReCaptcha} from "vue-recaptcha-v3";
import {useCartStore} from "@/pinia/useCartStore";
import {toast} from "vue3-toastify";
import {cursor} from "sisteransi";
import to = cursor.to;
const axios = useNuxtApp().$axios;
const loadPage = useCartStore()


const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');

  return token;
};

const state = reactive({
  sendRes: false,
  identidad: '',
  garantia: '',
  Fichas: []
})
const validarFicha = (value:string|null) =>{
  if (!value) return 'El # de cuenta es requerida';
  if (value?.length <= 5) return 'El # de ficha tiene que sey mayor a 5 carácteres';
  return true;
}
const validarIdentidad = (value:string|null) => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'La identidad es requerida';
  if (!regexIdentidad.test(value)) return 'La identidad solo tiene que llevar solo números. Sin guiones y sin espacios';
  if (value?.length !== 13) return 'La identidad tiene que ser de 13 carácteres';
  return true;
}

async function onSubmitConsulta(){
  let valIdentidad = validarIdentidad(state.identidad);
  let valFicha = validarFicha(state.garantia)
  if (valIdentidad=== true && valFicha === true){
    state.sendRes = true;
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('identidad', state.identidad);
    formData.append('cod', state.garantia);
    loadPage.switchLoadingPage();

    axios.post('ficha_garantia/consulta',formData).then((res:resConsultaInterface)=>{
      if (res.data.estado){
        state.Fichas = res.data.fichas;
        state.identidad = '';
        state.garantia  = '';
        toast.success(res.data.msj);
      }else
        toast.error(res.data.msj);

      loadPage.switchLoadingPage()
      state.sendRes = false;
    }).catch(()=>{
      loadPage.switchLoadingPage();
      state.sendRes = false;
      toast.error(`Hubo un error en el servidor`);
    })
  }else
    if (valFicha !== true)
      toast.error(valFicha);
    if (valIdentidad !== true)
      toast.error(valIdentidad)
}

interface resConsultaInterface{
  data: resDatosFichaInterface
}
interface resDatosFichaInterface{
  msj: string,
  estado: boolean,
  fichas: datosResFichaInterface[] | []
}
interface datosResFichaInterface{
  identidad: string,
  nombres: string,
  apellidos: string,
  marca: string,
  modelo: string,
  nombre_articulo: string,
  estado: string,
  serie: string
}
</script>

<style scoped>

</style>
