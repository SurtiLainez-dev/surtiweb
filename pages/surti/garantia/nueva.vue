<template>
  <div>
    <breadcrumb-4 title="Nuevo Proceso de Garantia" subtitle="Nueva Garantia"/>

    <section class="tp-order-area pb-160" v-if="state.vista === 1">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Nueva Ficha de Garantia</h3>
                <div class="profile__info-content">


                  <div>
                    <div class="row">
                      <div class="col-xxl-4 col-md-4">
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
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input
                                  type="text"
                                  v-model="state.venta"
                                  name="cuenta"
                                  placeholder="# de Cuenta"/>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__btn">
                          <button v-if="!state.sendReq" @click="onSubmitId"  class="tp-btn">Consultar Articulos</button>
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

    <section class="tp-order-area pb-160" v-if="state.vista === 2">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Selecciona un Artículo</h3>
                <div class="profile__info-content">
                  <!-- form start -->

                  <div class="profile__ticket table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th scope="col">Identidad</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Artículo</th>
                        <th scope="col">Serie del Fabricante</th>
                        <th scope="col">Color</th>
                      </tr>
                      </thead>
                      <tbody class="rowsCursor">
                          <tr @click="seleccionarArticulo(item)" v-for="item in firstData.Articulos">
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.identidad}}</td>
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.nombres}} {{item.apellidos}}</td>
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.marca}}</td>
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.modelo}}</td>
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.nombre_articulo}}</td>
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.serie}}</td>
                            <td :style="state.ArtSeleccionado.length > 0 && state.ArtSeleccionado[0].articulo === item.articulo ? 'background-color: #E6E5E4' : null">{{item.color}}</td>
                          </tr>
                          <tr @click="limpiarArtSeleccionados">
                            <td colspan="7" :style="state.ArtSeleccionado.length === 0 && state.selectArt ? 'background-color: #E6E5E4' : null" >
                              Seleccionar esta opción si ningún artículo de arriba no coincide con el que quieres reportar
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                  <br>
                  <p>1. Seleccione un artículo de la lista de arriba.</p>
                  <p>2. En el campo de abajo describa el proble que presenta el articulo</p>
                  <p>3. Seleccione el botón Enviar Caso de Garantía</p>
                  <p>* Si tiene un correo eléctronico asociado a su perfil, recibirá actualizaciones respecto a su caso.</p>
                  <div>
                    <div class="row">
                      <div class="col-xxl-12 col-md-12">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <textarea
                                rows="3"
                                v-model="state.comentario"
                                name="comentario"
                                placeholder="Describa el problema del articulo con un máximo de 400 carácteres..."/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xxl-12 col-md-12">
                      <div class="profile__btn">
                        <button
                            style="margin: 2px; background-color: #aaaaaa; border-color: #aaaaaa"
                            @click="state.vista = 1"
                            class="tp-btn">Regresar</button>
                        <button
                            v-if="!state.sendReq"
                            @click="onSubmitFicha"
                            style="margin: 2px" class="tp-btn">Enviar Caso de Garantía</button>
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

    <section class="tp-order-area pb-160" v-if="state.vista === 3">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Solicitúd de Garantía Enviada. # de caso {{state.ficha}}</h3>
                <div class="profile__info-content">
                  <p>Su solicitúd de garantía ha sido recibida exitosamente</p>
                  <p>En el transcurso de un día habil, un asesor del departamento se garantía de comunicará con usted
                    para conocer mas sobre el caso.</p>
                  <p>Para ver el estado de su caso puede seleccionar la opción del menú Ver Estado de Garantía. Pero si desea
                    ver la ficha completa y comentarios sobre su caso, tendrá que iniciar sesión en nuestra plataforma.</p>
                  <p>El # de caso de tu ficha es {{state.ficha}}, es importante que guarde este número.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="tp-order-area pb-160" v-if="state.vista === 4">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Solicitúd de Garantía Rechazada</h3>
                <div class="profile__info-content">
                  <p>Según nuestras fichas de garantía la cuenta asociada a su identidad y el artículo que usted
                    selecciono ya tienen un proceso de garantía. Sí desea reabrir una solicitúd de un
                    artículo que se le brindó garantía puede hacerlo desde su perfil.</p>
                  <p>Lamentamos mucho esta situación, si requiere asistencia o tiene preguntas no dude en contactarnos:</p>
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
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Nuevo Proceso de Garantia - Lainez Online" });
import { useReCaptcha } from 'vue-recaptcha-v3';
const axios = useNuxtApp().$axios;
import { useCartStore } from "@/pinia/useCartStore";
const loadPage = useCartStore()
import { toast } from "vue3-toastify";

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();

  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha('onSubmitId');

  return token;
};

const firstData: firtsReq ={
  identidad: "",
  cuenta: "",
  comentario: "",
  Articulos: [],
}
const state = reactive({
  selectArt: false,
  sendReq: false,
  vista: 1,
  ArtSeleccionado: [],
  cuenta: "",
  ficha: "",
  identidad: "",
  venta: "",
  comentario: ""
})

const limpiarArtSeleccionados = ()=>{
  state.ArtSeleccionado = [];
  state.selectArt = true;
};
const validarCuenta = (value:string|null) => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'El # de cuenta es requerida';
  if (!regexIdentidad.test(value)) return 'El # de cuenta tiene que llevar solo números. Sin guiones y sin espacios';
  if (value?.length <= 6) return 'El # de cuenta tiene que sey mayor a 5 carácteres';
  return true;
}
const validarIdentidad = (value:string|null) => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'La identidad es requerida';
  if (!regexIdentidad.test(value)) return 'La identidad solo tiene que llevar solo números. Sin guiones y sin espacios';
  if (value?.length !== 13) return 'La identidad tiene que ser de 13 carácteres';
  return true;
}
const validarComentario = (value:string|null) => {
  if (!value) return 'El comentario es obligatorio';
  if (value?.length <= 15) return 'El comentario tiene que ser mayor a 15 carácteres';
  if (value?.length >= 400) return 'El comentario tiene que ser menor a 400 carácteres';
  return true
}
const seleccionarArticulo = (item:artConsultaInterface)=>{
  state.ArtSeleccionado[0] = item;
  state.selectArt = true;
}
async function onSubmitId(){
  let valIdentidad = validarIdentidad(state.identidad);
  let valCuenta    = validarCuenta(state.venta)
  if (valIdentidad === true && valCuenta  === true){
    state.sendReq = true;
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('identidad', state.identidad);
    formData.append('cuenta', state.venta);
    loadPage.switchLoadingPage()

    axios.post('articulos_venta', formData).then((res:resVista1)=>{
      if (res.data.exist){
        firstData.Articulos = res.data.articulos
        state.vista         = 2;
        state.sendReq       = false;
        state.cuenta        = res.data.cuenta;
        toast.success(`Datos cargados exitosamente`);
      }else {
        toast.error(`No hay datos asociados a los datos que ingresaste`);
        state.sendReq = false;
      }
      loadPage.switchLoadingPage()
    }).catch(()=>{
      loadPage.switchLoadingPage()
      state.sendReq = false;
    })
  }else{
    if (valCuenta !== true)
      toast.error(valCuenta)
    if (valIdentidad !== true)
      toast.error(valIdentidad)
  }
}
async function onSubmitFicha(){
  if (state.selectArt){
    let valComentario = validarComentario(state.comentario)
    if (valComentario === true){
      state.sendReq = true;
      const token = await recaptcha();
      let formData = new FormData();
      let articulo = '';
      if (state.ArtSeleccionado.length > 0)
        articulo = state.ArtSeleccionado[0].articulo;

      formData.append('recaptcha-token', token);
      formData.append('articulo',   articulo);
      formData.append('comentario', state.comentario);
      formData.append('cuenta',     state.cuenta);
      loadPage.switchLoadingPage()

      axios.post('ficha_garantia', formData).then((res:resVista2)=>{
        if (res.data.estado){
          state.vista = 3;
          state.ficha = res.data.ficha;
          toast.success(res.data.msj);
        }else {
          state.vista = 4;
          toast.error(res.data.msj);
        }
        loadPage.switchLoadingPage()
      }).catch((error:any)=>{
        if (error.response.status === 422) {
          toast.error(error.response.data.msj);
          state.vista = 1;
        }
        loadPage.switchLoadingPage()
        state.sendReq = false;
      })
    }else
      toast.error(valComentario)
  }else
    toast.dark('Por favor seleccione una opción de la lista de artículos')
}
export interface resVista1{
  data: resIDInterface
}
export interface resVista2{
  data: resFichaGarantia
}
interface resFichaGarantia{
  msj: string,
  estado: boolean,
  ficha: string
}
export interface resIDInterface{
  msj: string,
  articulos: artConsultaInterface[],
  exist: boolean,
  cuenta: string
}
export interface artConsultaInterface{
  modelo: string,
  nombre_articulo: string,
  serie: string,
  color: string | null,
  nombres: string,
  apellidos: string,
  identidad: string,
  marca: string,
  articulo: number
}
export interface firtsReq {
  identidad: string,
  cuenta:    string,
  comentario: string,
  Articulos: artConsultaInterface [] | [],
}

</script>

<style scoped>
.rowsCursor{
  cursor: pointer;
}
</style>
