<template>
 <div class="tp-order-area pb-160">

   <br>
   <br>
   <br>
   <div class="container">
     <div class="row justify-content-center">
       <div class="col-xl-6 col-lg-8">
         <div v-if="vista === 1" class="tp-login-wrapper">
           <div class="tp-login-top text-center mb-30">
             <h3 class="tp-login-title">Validando Precalificación</h3>
           </div>
           <hr>
           <div v-if="precalificacion && precalificacion.estado_precalificacion_id === 1" class="tp-login-option">
             <p ><strong>Referencia de la Precalificación:</strong> {{precalificacion.cod}}</p>
             <p><strong>Nombre Completo:</strong> {{precalificacion.nombres}} {{precalificacion.apellidos}}</p>
             <hr>
             <div class="tp-login-input-box">
               <div class="tp-login-input">
                 <input v-model="datosPre.digitos" type="text" placeholder="00034"/>
               </div>
               <div class="tp-login-input-title">
                 <label for="name">*Últimos 5 Dígitos de la Identidad</label>
               </div>
             </div>

             <div class="tp-login-input-box">
               <div class="tp-login-input row">
                 <div class="col">
                   <input v-model="datosPre.dia" type="text" placeholder="dia"/>
                 </div>
                 <div class="col">
                   <input v-model="datosPre.mes" type="text"  placeholder="mes"/>
                 </div>
                 <div class="col">
                   <input v-model="datosPre.ano" type="text"  placeholder="año"/>
                 </div>
               </div>
               <div class="tp-login-input-title">
                 <label for="name">*Fecha de Nacimiento</label>
               </div>
             </div>
             <hr>
             <div class="tp-login-input-box">
               <p>Para continuar tienes que aceptar los siguientes terminos:</p>
               <label class="containerc">
                 Surtidora Lainez puede verificar tu información en los burós de créditos (Equifax y TransUnion)
                 <input type="checkbox" v-model="datosPre.politicas">
                 <span class="checkmark"></span>
               </label>
               <label class="containerc">
                 Leistes y aceptaste <a href="https://surtilainez.com/surti/politicas_precalificaciones" style="color: blue">los términos de las precalificaciones</a>
                 <input type="checkbox" v-model="datosPre.verificacion">
                 <span class="checkmark"></span>
               </label>
             </div>

             <hr>
             <div class="tp-login-bottom">
               <button  class="tp-btn tp-btn-blue w-100" @click="submitValidacion">Validar Datos</button>
             </div>
           </div>

           <div v-else class="tp-login-option">
             <p>Esta precalificación ya fue validada.</p>
           </div>
         </div>

         <div v-else class="tp-login-wrapper">
           <p>Los datos ya fueron validados.</p>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script lang="ts" setup>
import {useReCaptcha} from "vue-recaptcha-v3";
import {toast} from "vue3-toastify";
import {useCartStore} from "@/pinia/useCartStore";
import {isNodesEquivalent} from "@babel/types";

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');

  return token;
};
const loadPage = useCartStore()
const axios = useNuxtApp().$axios;
const route = useRoute();
const precalificacion = ref<Precalificacion | null>(null);
const status = ref(false);
const datosPre = ref({
  digitos: null,
  dia: '',
  mes: '',
  ano: '',
  politicas: false,
  verificacion: false
})
const vista = ref(1)

const validarDigitos = (value:string|null):boolean|string => {
  let regexDigitos = RegExp("^[0-9 ]*$");
  if (!value) return 'Los últimos 5 dígitos de la identidad son requeridos';
  if (!regexDigitos.test(value)) return 'Los últimos 5 dígitos de la identidad solo tiene que llevar números. Sin guiones y sin espacios';
  if (value?.length !== 5) return 'Los últimos 5 dígitos de la identidad tiene que ser de 5 carácteres';
  return true;
}
const validarFecha = (ano:string, mes:string, dia:string):boolean|string => {
  let fecha = new Date(ano, mes, dia);
  if (fecha.getFullYear() == ano && fecha.getMonth() == mes && fecha.getDate() == dia)return true;
  else return 'La fecha es invalida'
}

const cargarPrecalificacion = async () => {
  await  axios.post('precalificacion/'+route.params.token).then((res:ResPrecalificacion)=>{
    if (res.data.status){
      precalificacion.value = res.data.precalificacion[0];
      toast.success(res.data.msj)
      status.value = true
    }else {
      toast.error('La información no concuerda');
      status.value = false;
    }

    loadPage.switchLoadingPage();
  })
}
const submitValidacion =  async ()=>{
  if (datosPre.value.politicas && datosPre.value.verificacion){
    let valdigitos = validarDigitos(datosPre.value.digitos);
    let valFecha   = validarFecha(datosPre.value.ano, datosPre.value.mes, datosPre.value.dia);
    if (valFecha === true && valdigitos === true){
      const token = await recaptcha();
      let formData = new FormData();
      let fecha    = datosPre.value.ano+'-'+datosPre.value.mes+'-'+datosPre.value.dia
      loadPage.switchLoadingPage();
      formData.append('recaptcha-token', token);
      formData.append('fecha', fecha);
      formData.append('digitos', datosPre.value.digitos);
      axios.post('precalificacion/'+route.params.token+'/validar', formData).then((res:ResValidacion)=>{
        if (res.data.status){
          toast.success(res.data.msj);
          toast.success('Redireccionando a la página principal...');
          vista.value = 2;
          setTimeout(()=>{
            navigateTo('/')
          },5000);
        }else
          toast.error(res.data.msj)

        loadPage.switchLoadingPage();
      })
    }else{
      if (valdigitos !== true) toast.error(valdigitos);
      if (valFecha !== true) toast.error(valFecha.toString());
    }
  }else
    toast.error('Tienes que aceptar los términos de precalificaciones')
}
onMounted(()=>{
  loadPage.switchLoadingPage();
  cargarPrecalificacion();
})

interface ResValidacion{
  data:{
    msj: '',
    status: boolean
  }
}
interface ResPrecalificacion{
  data:{
    precalificacion: [Precalificacion],
    msj: string,
    status: boolean
  }
}
interface Precalificacion{
  nombres: string,
  apellidos: string,
  cod: string,
  estado_precalificacion_id: number
}
</script>

<style scoped>
.containerc {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.containerc input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.containerc:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.containerc input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.containerc input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.containerc .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
