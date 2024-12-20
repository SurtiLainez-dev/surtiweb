<template>
  <div>
    <breadcrumb-4 title="Solicitúd Estado de Cuentas" subtitle="Solicitando Estado de Cuentas"/>

    <section class="tp-order-area pb-160" v-if="state.vista === 1">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Nueva Solicitúd de Estado de Cuenta</h3>
                <div class="profile__info-content">
                  <div>
                    <div class="row">
                      <div class="col-xxl-8 col-md-8">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="text"
                                v-model="state.identidad"
                                name="identidad"
                                placeholder="Identidad del Cliente"/>
                            <span><svg-user-3/></span>
                          </div>
                        </div>
                      </div>
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__btn">
                          <button v-if="!state.sendReq" @click="onSubmitId"  class="tp-btn">Consultar</button>
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

    <section class="tp-order-area pb-160" v-else-if="state.vista === 2">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Constancia de Estado de Cuentas para {{state.cliente}} - {{state.identidad}}</h3>
                <div class="profile__info-content">
                  <div>
                    <div class="row">
                      <div class="col-xxl-5 col-md-5">
                        <span>*Correo Electronico del Cliente</span>
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="email"
                                v-model="state.email"
                                name="email"
                                placeholder="Introducir un correo electronico"/>
                            <span><svg-email/></span>
                          </div>
                          <span>Correl Electronico Personal</span>
                        </div>
                      </div>
                      <div class="col-xxl-5 col-md-5">
                        <span>Para:</span>
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="email"
                                v-model="state.para"
                                name="email"
                                placeholder="Introducir nombre o empresa a quien se dirige la constancia"/>
                            <span><svg-user/></span>
                          </div>
                        </div>
                        <span>Este campo no es obligatorio</span>
                      </div>
                      <div class="col-xxl-2 col-md-2">
                        <br>
                        <div class="profile__btn">
                          <button v-if="!state.sendReq" @click="onSubmitFiniquito" class="tp-btn">Enviar</button>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xxl-12 col-md-12">
                        <div class="profile__btn">
                          <button
                              style="margin: 2px; background-color: #aaaaaa; border-color: #aaaaaa"
                              @click="state.vista = 1"
                              class="tp-btn">Regresar</button>
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

    <section class="tp-order-area pb-160" v-else-if="state.vista === 3">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Solicitúd Enviada</h3>
                <div class="profile__info-content">
                  <p>La solicitúd ha sido enviada exitosamente. En un día habil podremos darte una respuesta.</p>
                  <p>Cuando la solicitúd sea aceptada, enviaremos un correo eléctronico notificandote.</p>
                  <p>Para descargar la constancia tienes que iniciar sesión en nuestra plataforma.</p>
                  <p>Nuestros contactos de servicio al cliente son los siguientes:</p>
                  <p><b>Teléfono (Honduras): </b> +504 9625-2525</p>
                  <p><b>Teléfono (USA): </b> +1 346-461-9433</p>
                  <p><b>Correo Eléctronico: </b> sac@grupolainez.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="tp-order-area pb-160" v-else-if="state.vista === 4">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Sin Coincidencias</h3>
                <div class="profile__info-content">
                  <p>La identidad que ingresaste no coincide como cliente en nuestra base de datos. Por favor verifica
                  tu identidad nuevamente.</p>
                  <p>Si tu identidad es correcta y estas seguro de que haz sido cliente de nosotros
                    por favor contacta al servicio al cliente de Surtidora Lainez, Estaremos encantados de ayudarte.</p>
                  <p>Nuestros contactos de servicio al cliente son los siguientes:</p>
                  <p><b>Teléfono (Honduras): </b> +504 9625-2525</p>
                  <p><b>Teléfono (USA): </b> +1 346-461-9433</p>
                  <p><b>Correo Eléctronico: </b> sac@grupolainez.com</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xxl-12 col-md-12">
              <div class="profile__btn">
                <button
                    style="margin: 2px; background-color: #aaaaaa; border-color: #aaaaaa"
                    @click="state.vista = 1"
                    class="tp-btn">Regresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="tp-order-area pb-160" v-else-if="state.vista === 5">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Solicitudes Pendientes</h3>
                <div class="profile__info-content">
                  <p>Ya tienes una Solicitúd de Contancia de Estado de Cuentas enviada sin responder. Para solicitar
                  mas contancias tienes que esperar que el depactamento de Contabilidad te responda de la solicitúd pendiente.</p>
                  <p>Si quieres solicitar otra constancia urgente puedes contactarte con el servicio al cliente de Surtidora Lainez</p>
                  <p>Nuestros contactos de servicio al cliente son los siguientes:</p>
                  <p><b>Teléfono (Honduras): </b> +504 9625-2525</p>
                  <p><b>Teléfono (USA): </b> +1 346-461-9433</p>
                  <p><b>Correo Eléctronico: </b> sac@grupolainez.com</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xxl-12 col-md-12">
              <div class="profile__btn">
                <button
                    style="margin: 2px; background-color: #aaaaaa; border-color: #aaaaaa"
                    @click="state.vista = 1"
                    class="tp-btn">Regresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

useSeoMeta({ title: "Solicitando Estado de Cuentas - Lainez Online" });
import {useReCaptcha} from "vue-recaptcha-v3";
import {useCartStore} from "@/pinia/useCartStore";
import {toast} from "vue3-toastify";
const axios = useNuxtApp().$axios;
const loadPage = useCartStore();

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  await recaptchaInstance?.recaptchaLoaded();
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');
  return token;
};
const state = reactive({
  vista: 1,
  identidad: '',
  sendReq: false,
  is_mencion: false,
  para: '',
  email: '',
  cliente: ''
});

const validarIdentidad = (value:string|null) => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'La identidad es requerida';
  if (!regexIdentidad.test(value)) return 'La identidad solo tiene que llevar solo números. Sin guiones y sin espacios';
  if (value?.length !== 13) return 'La identidad tiene que ser de 13 carácteres';
  return true;
}

const validarEmail = (value:string|null) => {
  let regexEmail = RegExp("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$");
  if (!value) return 'El email es requerida';
  if (!regexEmail.test(value)) return 'El Email es invalido';
  return true;
}

async function onSubmitId(){
  let valIdentidad = validarIdentidad(state.identidad);
  if (valIdentidad === true){
    let formData = new FormData();
    const token = await recaptcha();

    formData.append('identidad', state.identidad);
    formData.append('recaptcha-token', token);

    loadPage.switchLoadingPage()
    axios.post('validar_identidad',formData).then((res:resValidadIdentidad)=>{
      if (res.data.status){
        state.vista = 2;
        state.email = res.data.cliente.email;
        state.cliente = res.data.cliente.nombres+' '+res.data.cliente.apellidos;
      }else{
        state.vista = 5;
      }
      toast.success(res.data.msj);
      loadPage.switchLoadingPage()
    }).catch((error:any)=>{
      if (error.response.status === 422) {
        toast.error(error.response.data.msj);
        state.vista = 4;
      }else
        toast.error('Hubo un error en el servidor al consultar la identidad');
      loadPage.switchLoadingPage()
      state.sendReq = false;
    })
  }else{
    // @ts-ignore
    if (valIdentidad !== true)
      toast.error(valIdentidad)
  }
}

async function onSubmitFiniquito(){
  let valIdentidad = validarIdentidad(state.identidad);
  let valEmail     = validarEmail(state.email);

  if (valIdentidad === true && valEmail){
    let formData = new FormData();
    const token = await recaptcha();
    let is_mencion = 0;
    if (state.para && state.para.length > 0)
      is_mencion = 1;

    formData.append('is_mencion', is_mencion);
    formData.append('para', state.para);
    formData.append('email', state.email);
    formData.append('identidad', state.identidad);
    formData.append('recaptcha-token', token);

    loadPage.switchLoadingPage()
    axios.post('finiquito',formData).then((res:resReqFiniquito)=>{
      toast.success(res.data.msj);
      state.vista = 3;
      loadPage.switchLoadingPage()
    }).catch((error:any)=>{
      toast.error('Hubo un error en el servidor');
      loadPage.switchLoadingPage()
      state.sendReq = false;
    })
  }else{
    // @ts-ignore
    if (valIdentidad !== true)
      toast.error(valIdentidad)

    if (valEmail !== true)
      toast.error(valEmail)
  }
}

interface resValidadIdentidad{
  data: dataValidarIdentidad
}
interface resReqFiniquito{
  data: dataReqFiniquito;
}
interface dataReqFiniquito{
  msj: string
}
interface dataValidarIdentidad{
  msj: string,
  cliente: {nombres: string, apellidos: string, email:string | null},
  status: boolean
}
</script>

<style scoped>

</style>
