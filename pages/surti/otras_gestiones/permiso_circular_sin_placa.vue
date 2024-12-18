<template>
  <div>
    <breadcrumb-4 title="Solicitando Permiso de Circulación" subtitle="Solicitando permiso para circular sin placa"/>

    <section class="tp-order-area pb-160" >
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Solicitar Permiso para Circular sin Placa</h3>
                <span>*Para ver sus permisos generados tiene que crear un cuenta en <a style="color: #003eff" href="https://surtilainez.com/register">surtilainez.com</a></span>
                <div class="profile__info-content">
                  <!-- form start -->

                  <div>
                    <div class="row">
                      <div class="col-xxl-4 col-md-6">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="text"
                                v-model="state.identidad"
                                name="chasis"
                                placeholder="Identidad del Cliente"/>
                          </div>
                        </div>
                      </div>
                      <div class="col-xxl-4 col-md-6">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="text"
                                v-model="state.cuenta"
                                name="chasis"
                                placeholder="# de cuenta"/>
                          </div>
                        </div>
                      </div>
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__btn">
                          <button @click="consultarInfo" class="tp-btn">Consultar Datos</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="profile__ticket table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Color</th>
                        <th scope="col">Chasis</th>
                        <th scope="col">Motor</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Generar</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in state.Motos">
                          <td>{{item.marca}}</td>
                          <td>{{item.modelo}}</td>
                          <td>{{item.color}}</td>
                          <td>{{item.chasis}}</td>
                          <td>{{item.motor}}</td>
                          <td>{{item.placa}}</td>
                          <td>
                            <button @click="generarPermiso(item)" class="tp-btn">Generar</button>
                          </td>
                        </tr>
                        <tr v-if="state.Motos.length > 0">
                          <td colspan="6">*Seleccione la motocicleta de la cual quisiera generar el permiso. Para descargar el
                          permiso tienes que crear una cuenta en Surti Online y en tu perfil estará tu permiso.</td>
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
import {toast} from "vue3-toastify";
const axios = useNuxtApp().$axios;
import {useCartStore} from "@/pinia/useCartStore";
const loadPage = useCartStore();

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  await recaptchaInstance?.recaptchaLoaded();
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');
  return token;
};


const state = reactive({
  sendRes:   false,
  idMoto:    '',
  Motos:     [],
  identidad: '',
  cuenta:    ''
});

const generarPermiso = async (data:MotocicletasInterfacez) => {
  let formData = new FormData();
  const token = await recaptcha();

  formData.append('cuenta',       data.venta);
  // @ts-ignore
  formData.append('moto_id',       data.id);
  // @ts-ignore
  formData.append('recaptcha-token', token);
  loadPage.switchLoadingPage();

  // @ts-ignore
  axios.post(`generar_permiso_moto`,formData).then((res:resGenerarPermiso)=>{
    toast.success(res.data.msj);
    loadPage.switchLoadingPage();
    // @ts-ignore
    state.Motos     = [];
    state.identidad = '';
    state.cuenta    = '';
  }).catch((error:any)=>{
    if (error.response.status === 422)
      toast.error(error.response.data.msj);
    else
      toast.error('Hubo un error en el servidor');
    loadPage.switchLoadingPage()
  })
}

const consultarInfo = async () =>{
  let valIdentidad = validarIdentidad(state.identidad);
  let valCuenta    = validarCuenta(state.cuenta);
  if (valIdentidad === true && valCuenta === true){
    let formData = new FormData();
    const token = await recaptcha();

    formData.append('identidad', state.identidad);
    formData.append('cod',       state.cuenta);
    // @ts-ignore
    formData.append('recaptcha-token', token);
    loadPage.switchLoadingPage()
    // @ts-ignore
    axios.post(`motocicletas_cliente`,formData).then((res:resBuscarMotos)=>{
      toast.success(res.data.msj);
      loadPage.switchLoadingPage();
      // @ts-ignore
      state.Motos = res.data.motos
    }).catch((error:any)=>{
      if (error.response.status === 422)
        toast.error(error.response.data.msj);
      else
        toast.error('Hubo un error en el servidor');
      loadPage.switchLoadingPage()
    })
  }else{
    if (valIdentidad !== true)
      toast.error(valIdentidad)
    if (valCuenta !== true)
      toast.error(valCuenta);
  }
}

const validarCuenta = (value:string|null) => {
  if (!value) return 'La cuenta es requerida';
  if (value?.length < 5) return 'La cuenta tiene que ser de 5 carácteres';
  return true;
}
const validarIdentidad = (value:string|null) => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'La identidad es requerida';
  if (!regexIdentidad.test(value)) return 'La identidad solo tiene que llevar solo números. Sin guiones y sin espacios';
  if (value?.length !== 13) return 'La identidad tiene que ser de 13 carácteres';
  return true;
}

interface resGenerarPermiso{
  data: reqGenerarPermiso
}
interface reqGenerarPermiso{
  msj: '';
}
interface resBuscarMotos{
  data: reqBuscarMotos
}
interface reqBuscarMotos{
  msj: '';
  motos: MotocicletasInterfacez
}
interface MotocicletasInterfacez{
  chasis: string,
  color: string,
  placa: string,
  modelo: string,
  venta: string,
  id: number
}
</script>

<style scoped>

</style>
