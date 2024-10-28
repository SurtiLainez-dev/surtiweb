<template>
  <div>
    <breadcrumb-4 title="Consulta de Placa" subtitle="Consultando Estado de Placa"/>

    <section class="tp-order-area pb-160" >
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Consultando Estado de Placa</h3>
                <div class="profile__info-content">
                  <!-- form start -->

                  <div>
                    <div class="row">
                      <div class="col-xxl-6 col-md-6">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                type="text"
                                v-model="state.chasis"
                                name="chasis"
                                placeholder="Chasis de la Motocicleta"/>
                          </div>
                        </div>
                      </div>
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__btn">
                          <button v-if="!state.sendRes" @click="onSubmitConsulta"  class="tp-btn">Consultar Placa</button>
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
                        <th scope="col">Chasis</th>
                        <th scope="col">Motor</th>
                        <th scope="col">Estado de Placa</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Total a Pagar</th>
                        <th scope="col">¿Entregada?</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in state.Motos">
                        <td>{{item.marca}}</td>
                        <td>{{item.modelo}}</td>
                        <td>{{item.chasis}}</td>
                        <td>{{item.motor}}</td>
                        <td>
                          <div class="chip chipPendiente"
                              v-if="item.placa === null || item.placa.length === 0"><span>Pendiente</span></div>
                          <div v-else class="chip chipListo"><span>Para Entregar</span></div>
                        </td>
                        <td>{{item.placa}}</td>
                        <td>L. {{Intl.NumberFormat().format(item.pago_placa)}}</td>
                        <td>
                          <div class="chip chipPendiente"
                               v-if="item.placa_entregada === 0"><span>No</span></div>
                          <div v-else class="chip chipListo"><span>Si</span></div>
                        </td>
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
useSeoMeta({ title: "Estado de Placa - Lainez Online" });
import {useReCaptcha} from "vue-recaptcha-v3";
import {useCartStore} from "@/pinia/useCartStore";
import {toast} from "vue3-toastify";
const axios = useNuxtApp().$axios;
const loadPage = useCartStore()

const state = reactive({
  sendRes: false,
  chasis: '',
  Motos: []
});

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');

  return token;
};

async function onSubmitConsulta(){
  let val = validarChasis(state.chasis);
  if (val === true){
    state.sendRes = true;
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('chasis', state.chasis);
    loadPage.switchLoadingPage();

    axios.post(`motocicleta/consulta/placa`, formData)
        .then((res:resConsultaInterface)=>{
          if (res.data.estado){
            state.Motos = res.data.Moto;
            toast.success(res.data.msj);
          }else
            toast.error(res.data.msj);

          loadPage.switchLoadingPage()
          state.sendRes = false;
        })
        .catch(()=>{
          loadPage.switchLoadingPage();
          state.sendRes = false;
          toast.error(`Hubo un error en el servidor`);
        })
  }else
    toast.success(val)

}

const validarChasis = (value:string|null):string | boolean=>{
  if (!value) return 'El # de chasis es requerida';
  if (value?.length <= 10) return 'El # de chasis tiene que sey mayor a 10 carácteres';
  return true;
}


// export default defineComponent({
//   methods:{
//     async onSubmitConsulta():Promise<void>{
//       if (this.validarChasis(this.state.chasis) === true){
//         this.state.sendRes = true;
//         const token = await this.recaptcha();
//         let formData = new FormData();
//         formData.append('recaptcha-token', token);
//         formData.append('chasis', this.state.chasis);
//         loadPage.switchLoadingPage();
//
//         axios.post(`motocicleta/consulta/placa`, formData)
//             .then((res:resConsultaInterface)=>{
//               if (res.data.estado){
//                 this.state.Motos = res.data.Moto;
//                 toast.success(res.data.msj);
//               }else
//                 toast.error(res.data.msj);
//
//               loadPage.switchLoadingPage()
//               this.state.sendRes = false;
//             })
//             .catch(()=>{
//               loadPage.switchLoadingPage();
//               this.state.sendRes = false;
//               toast.error(`Hubo un error en el servidor`);
//             })
//       }
//     },
//     validarChasis(value:string|null){
//       if (!value) return 'El # de chasis es requerida';
//       if (value?.length <= 10) return 'El # de chasis tiene que sey mayor a 10 carácteres';
//       return true;
//     }
//   }
// })




interface resConsultaInterface{
  data: resDatosMotoInterface
}
interface resDatosMotoInterface{
  msj: string,
  estado: boolean,
  motos: datosResMotoInterface | []
}
interface datosResMotoInterface{
  chasis: string,
  motor: string,
  color: string,
  marca: string,
  modelo: string,
  placa: string | null,
  placa_entregada: number,
  pago_placa: number
}
</script>

<style scoped>
.chip{
  border-radius: 20px;
  padding-left: 10px;
  color: #FFFFFF;
  width: 100px
}
.chipPendiente{
  background-color: red;
}
.chipListo{
  background-color: green;
}
</style>
