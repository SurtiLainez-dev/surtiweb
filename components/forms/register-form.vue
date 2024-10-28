<template>
  <div v-if="vista === 1" >
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="state.identidad" placeholder="sin guiones"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Número de Identidad</label>
        </div>
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input v-model="state.dia" type="text" placeholder="día" />
          <input v-model="state.mes" type="text" placeholder="mes"/>
          <input v-model="state.ano" type="text" placeholder="año"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Fecha de Nacimiento</label>
        </div>
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input v-model="state.email"  type="email" placeholder="tucorreo@gmail.com"/>
        </div>
        <div class="tp-login-input-title">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
          <input
            v-model="state.password"
            :type="showPass?'text':'password'"
            name="password"
            placeholder="Min. 8 caracteres"
          />
        </div>
        <div class="tp-login-input-eye" id="password-show-toggle">

          <span class="open-eye" @click="togglePasswordVisibility">
            <template v-if="showPass">
              <svg-open-eye />
            </template>
            <template v-else>
              <svg-close-eye />
            </template>
          </span>

        </div>
        <div class="tp-login-input-title">
          <label for="tp_password">Contraseña</label>
        </div>
      </div>
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
          <input
            v-model="state.password2"
            :type="showPass?'text':'password'"

            placeholder="Min. 8 caracteres"
          />
        </div>
        <div class="tp-login-input-eye" id="password-show-toggle">

          <span class="open-eye" @click="togglePasswordVisibility">
            <template v-if="showPass">
              <svg-open-eye />
            </template>
            <template v-else>
              <svg-close-eye />
            </template>
          </span>

        </div>
        <div class="tp-login-input-title">
          <label for="tp_password">Repetir Contraseña</label>
        </div>
      </div>
      </div>
    </div>
    <div v-if="state.errors.length > 0">
      <ul>
        <li v-for="e in state.errors">{{e}}</li>
      </ul>
    </div>
    <div class="tp-login-bottom">
      <button @click="onSubmitIdentidad" v-if="!state.sendReq"  class="tp-login-btn w-100">Crear Cuenta</button>
    </div>
  </div>

  <div v-else-if="vista === 2">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" disabled v-model="state.apellido" placeholder="sin guiones"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Apellido Relacionado con la Identidad</label>
        </div>
      </div>
      <p>Si el apellido no concuerda con tu identidad, por favor selecciona regresar y revisa los datos. Si el error persiste
      ponte en contacto a sac@grupolainez.co para que te podamos ayudar.</p>
      <div class="tp-login-bottom">
        <button @click="registrarCuenta" v-if="!state.sendReq"  class="tp-login-btn w-100">El Apellido es Correcto</button>
        <button @click="vista = 1" style="background-color:#ff4a01" class="tp-login-btn btn-warning w-100 mt-2">Regresar</button>
      </div>
    </div>
  </div>

  <div v-else-if="vista === 3">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="state.cod" placeholder="000000"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Codigo de Verificación</label>
        </div>
      </div>
      <p>Se te envió un código de verificación al Email {{state.email}}, por favor revisa y coloca el codigo en el campo de arriba
        para activar tu cuenta.</p>
      <div class="tp-login-bottom">
        <button @click="onSubmitValidarCod" v-if="!state.sendReq"  class="tp-login-btn w-100">Enviar Codigo</button>
        <button @click="limpiarDatos()" style="background-color:#ff4a01" class="tp-login-btn btn-warning w-100 mt-2">Salir</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
const loadPage = useCartStore()
import {useReCaptcha} from "vue-recaptcha-v3";
import {toast} from "vue3-toastify";
const axios = useNuxtApp().$axios;
const state = reactive({
  sendReq: false,
  identidad: "",
  dia: "",
  mes: "",
  ano: "",
  email: "",
  password: "",
  password2: "",
  apellido: "",
  isResFina: false,
  errors: [],
  cod: ''
})

let showPass = ref<boolean>(false);
let vista    = ref<number>(1);

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');

  return token;
};


const registrarCuenta = () =>{
  let formData = new FormData();
  formData.append('email', state.email);
  formData.append('identidad', state.identidad);
  formData.append('fecha_nacimiento', state.ano+'-'+state.mes+'-'+state.dia);
  formData.append('apellido', state.apellido);
  formData.append('password', state.password);
  loadPage.switchLoadingPage();
  state.sendReq = true;
  axios.post('/user/registrar',formData).then((res:resRegisterDataInterface)=>{
    toast.success(res.data.msj);
    vista.value   = 3;
    state.sendReq = false;
    loadPage.switchLoadingPage();
  }).catch(()=>{
    toast.error('Hubo un error al crear tu cuenta, intentalo mas tarde');
    loadPage.switchLoadingPage()
    state.sendReq = false;
    limpiarDatos();
  })
}

const limpiarDatos = () =>{
  state.apellido = '';
  state.identidad = '';
  state.email     = '';
  state.password  = '';
  state.password2 = '';
  vista.value   = 1;
}

async function onSubmitValidarCod(){
  if (state.cod && state.cod.length === 6){
    state.sendReq = true;
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('email', state.email);
    formData.append('cod',   state.cod);
    loadPage.switchLoadingPage()
    axios.post('user/validar_cod', formData).then((res:resRegisterDataInterface)=>{
      toast.success('Su cuenta ha sido activadamente exitosamente');
      navigateTo('/login')
      loadPage.switchLoadingPage()
    }).catch((error:any)=>{
      if (error.response.status === 422) {
        toast.error(error.response.data.msj);
        vista.value = 1;
      }
      loadPage.switchLoadingPage()
      state.sendReq = false;
      limpiarDatos();
    })

  }else
    toast.error('El codigo tiene que tener 6 digitos')
}
async function onSubmitIdentidad(){
  let valIdentidad = validarIdentidad(state.identidad);
  let valFecha     = validarFecha();
  let valEmail     = validarEmail(state.email);
  let valPassword  = validarPassword(state.password);
  let valPassword2 = validarPassword2(state.password, state.password2);
  state.errors     = [];
  if (valIdentidad === true && valFecha === true && valEmail === true && valPassword === true && valPassword2 === true){
    state.sendReq = true;
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('email', state.email);
    formData.append('identidad', state.identidad);
    formData.append('fecha_nacimiento', state.ano+'-'+state.mes+'-'+state.dia);
    loadPage.switchLoadingPage();

    axios.post('user/cuenta_nueva', formData).then((res:resRegisterDataInterface)=>{
      state.apellido = res.data.apellido;
      vista.value    = 2;
      toast.success(res.data.msj)
      loadPage.switchLoadingPage()
      state.sendReq = false;
    }).catch((error:any)=>{
      if (error.response.status === 422) {
        toast.error(error.response.data.msj);
        vista.value = 1;
      }
      loadPage.switchLoadingPage()
      state.sendReq = false;
    })

  }else{
    if (valIdentidad !== true) state.errors.push(valIdentidad);
    if (valFecha !== true) state.errors.push(valFecha);
    if (valEmail !== true) state.errors.push(valEmail);
    if (valPassword !== true) state.errors.push(valPassword);
    if (valPassword2 !== true) state.errors.push(valPassword2);
  }
}

const validarIdentidad = (value:string|null) => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'La identidad es requerida';
  if (!regexIdentidad.test(value)) return 'La identidad solo tiene que llevar solo números. Sin guiones y sin espacios';
  if (value?.length !== 13) return 'La identidad tiene que ser de 13 carácteres';
  return true;
}
const validarFecha = () => {
  let fecha = state.ano+'-'+state.mes+'-'+state.dia;
  let validarFecha = new Date(fecha);
  if (isFinite(validarFecha))
    return true;
  else
    return 'La fecha de nacimiento es incorrecta'
}
const validarEmail = (value:string|null) => {
  let regexEmail = RegExp("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$");
  if (!value) return 'El email es requerida';
  if (!regexEmail.test(value)) return 'El Email es invalido';
  return true;
}
const validarPassword = (value:string|null) => {
  if (!value) return 'La contraseña es requerida';
  if (value?.length < 8) return 'La contraseña no puede ser menor a 8 caracteres';
  return true;
}

const validarPassword2 = (value:string|null, value2:string|null) => {
  if (value !== value2) return 'Las contraseñas no coinciden'
  else return true
}

interface resRegisterDataInterface{
  data: resRegisterInterface
}

interface resRegisterInterface{
  msj: string,
  apellido: string
}
</script>
