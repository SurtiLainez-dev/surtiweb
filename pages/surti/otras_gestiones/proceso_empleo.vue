<template>
  <div>
    <breadcrumb-4 title="Solicitúd  de Empleo" subtitle="Iniciando proceso Solicitúd de Empleo"/>


    <div v-if="vista === 1" class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <div class="tp-login-wrapper">
            <div class="tp-login-top text-center mb-30">
              <h3 class="tp-login-title">Recopilación de Información</h3>
            </div>
            <div class="tp-login-option">
              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.identidad" type="text" placeholder="sin guiones"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">*Número de Identidad</label>
                  </div>
                </div>
              </div>

              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.nombre_completo" type="text"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">*Nombre Completo</label>
                  </div>
                </div>
              </div>

              <div class="tp-login-input-box">
                <div class="tp-login-input">
                  <div class="tp-shop-top-select">
                    <ui-nice-select
                        v-model="data.interesado_en"
                        style="width: 100%"
                        :options="[
          { value: 'Horario Completo', text: 'Horario Completo' },
          { value: 'Trabajo de Medio Tiempo', text: 'Trabajo de Medio Tiempo' },
          { value: 'Solicitúd de Práctica Profesional', text: 'Solicitúd de Práctica Profesional' },
        ]"
                        name="Seleccione un item"
                        :default-current="0"
                    />
                  </div>
                </div>
                <div class="tp-login-input-title">
                  <label for="name">*Estoy interesado en:</label>
                </div>
              </div>

              <div class="tp-login-input-box">
                <div class="tp-login-input">
                  <div class="tp-shop-top-select">
                    <ui-nice-select
                        v-model="data.puesto"
                        style="width: 100%"
                        :options="[
          { value: 'Auxiliar Contable', text: 'Auxiliar Contable' },
          { value: 'Contabilidad - Manager', text: 'Contabilidad - Manager' },
          { value: 'Asesor de Ventas', text: 'Asesor de Ventas' },
          { value: 'Gestor de Cobranzas' , text: 'Gestor de Cobranzas' },
          { value: 'Gestor de Facturación', text: 'Gestor de Facturación' },
          { value: 'Gestor de Servicio al Cliente', text: 'Gestor de Servicio al Cliente' },
          { value: 'Gerente de Piso de Ventas', text: 'Gerente de Piso de Ventas' },
          { value: 'Conductor de Vehiculo Liviano' , text: 'Conductor de Vehiculo Liviano' },
          { value: 'Conductor de Vehiculo Pesado' , text: 'Conductor de Vehiculo Pesado' },
          { value: 'Colaborador de Multples Tareas en el Piso de Venta', text: 'Colaborador de Multples Tareas en el Piso de Venta' },
          { value: 'Gerente de Ventas' , text: 'Gerente de Ventas' },
          { value: 'IT - Programador' , text: 'IT - Programador' },
          { value: 'Otro' , text: 'Otro' },
        ]"
                        name="Seleccione un item"
                        :default-current="0"
                    />
                  </div>
                </div>
                <div class="tp-login-input-title">
                  <label for="name">*Seleccione el Puesto de su Interes</label>
                </div>
              </div>

              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.domicilio" type="text"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">*Domicilio Completo Actual</label>
                  </div>
                </div>
              </div>

              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.telefono" type="text"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">*Telefono Actual</label>
                  </div>
                </div>
              </div>

              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.email" type="text"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">*Email Actual</label>
                  </div>
                </div>
              </div>

              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.ultimo_trabajo" type="text" placeholder="puesto/lugar de trabajo"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">Último Trabajo</label>
                  </div>
                </div>
              </div>

              <div class="tp-login-input-box">
                <label for="fileUpload">Curriculum Pdf</label>
                <input @change="selectFile" type="file" accept="application/pdf" id="fileUpload" />
              </div>

              <div class="tp-login-input-box">
                <div class="tp-login-input">
                  <div class="tp-shop-top-select">
                    <ui-nice-select
                        v-model="data.is_trabaja"
                        style="width: 100%"
                        :options="[
          { value: 0, text: 'No' },
          { value: 1, text: 'Si' },
        ]"
                        name="Seleccione un item"
                        :default-current="0"
                    />
                  </div>
                </div>
                <div class="tp-login-input-title">
                  <label for="name">*¿Actualmente esta Trabajando?</label>
                </div>
              </div>

              <div class="tp-login-input-wrapper">
                <div class="tp-login-input-box">
                  <div class="tp-login-input">
                    <input v-model="data.comentario" type="text" placeholder="Cualquier comentario relevante"/>
                  </div>
                  <div class="tp-login-input-title">
                    <label for="name">Comentario a RRHH</label>
                  </div>
                </div>
              </div>
              <br>
              <br>
              <div class="tp-login-bottom">
                <button  class="tp-login-btn w-100" @click="onSubmitProcesoEmpleo">Enviar Solitúd de Empleo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="vista === 2" class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <div class="tp-login-wrapper">
            <div class="tp-login-input-wrapper">
              <small>
                Muchas gracias por tu interes en formar parte del equipo de Surtidora Lainez. Hemos recibido tu curriculum.
                Nosotros revisaremos tu solicitúd y te estaremos contactando en un plazo de 7 a 10 días hábiles. Si tardamos mas de lo normal en contactarte
                te pedimos una disculpa, actualmente estamos recibiendo muchas solicitudes y nuestro equipo de recursos humanos
                esta trabajando arduamente respondiendo todas las solicitudes.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br>
    <br>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "@/pinia/useCartStore";
import {useReCaptcha} from "vue-recaptcha-v3";
import {toast} from "vue3-toastify";
const loadPage = useCartStore();
const recaptchaInstance = useReCaptcha();
const vista = ref(1);
const data = ref({
  identidad: '0201199800946',
  nombre_completo: 'WILLIAMS SANTOS',
  interesado_en: 'Horario Completo',
  puesto: 'Auxiliar Contable',
  domicilio: 'TRUJILLO, COLON',
  telefono: '95625033',
  email: 'willydsl98@gmail.com',
  ultimo_trabajo: 'Surtidora Lainez',
  is_trabaja: 'No',
  comentario: 'Comentario de Ejemplo',
  file: null
})
const axios = useNuxtApp().$axios;

const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitProcesoEmpleo');

  return token;
};
const selectFile = (e)=>{
  let input = e.target.files[0];
  data.value.file = input;
}
const onSubmitProcesoEmpleo = async () => {
  if (data.value.file){
    if (
        (data.value.identidad && data.value.identidad.length >= 13) &&
        (data.value.nombre_completo && data.value.nombre_completo.length >= 5) &&
        (data.value.domicilio && data.value.domicilio.length >= 5) &&
        (data.value.telefono && data.value.telefono.length >= 8) &&
        (data.value.telefono && data.value.email.length >= 9)
    ){
      loadPage.switchLoadingPage();
      const token = await recaptcha()
      let formData = new FormData();
      let dataProceso = data.value
      formData.append('recaptcha-token',           token);
      formData.append('identidad',       dataProceso.identidad);
      formData.append('nombre_completo', dataProceso.nombre_completo);
      formData.append('interesado_en',   dataProceso.interesado_en);
      formData.append('puesto',          dataProceso.puesto);
      formData.append('domicilio',       dataProceso.domicilio);
      formData.append('telefono',        dataProceso.telefono);
      formData.append('email',           dataProceso.email);
      formData.append('ultimo_trabajo',  dataProceso.ultimo_trabajo);
      formData.append('is_trabaja',      dataProceso.is_trabaja);
      formData.append('comentario',      dataProceso.comentario);
      formData.append('file',            data.value.file);

      axios.post('enviar_vitae',formData).then((res)=>{
        toast.success('Se ha enviado correctamente!!');
        loadPage.switchLoadingPage();
        vista.value = 2;
      }).catch(()=>{
        loadPage.switchLoadingPage();
        toast.error('Hubo un error. Intenta nuevamente en un momento!');
      })
    } else toast.error('Uno de los campos obligatorio esta incompleto')
  }else toast.error('No haz adjuntado tu curriculum!');
}
</script>

<style scoped>

</style>
