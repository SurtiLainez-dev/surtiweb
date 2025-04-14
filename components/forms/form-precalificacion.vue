<template>
  <div>
    <p class="text-center" style="color: #809298">{{vista===1?'Enviando Identidad':
        vista===2?'Datos del Cliente':
            vista===3?'Datos del Credito':
                vista === 4?'Documento del Cliente':vista === 5?'Validando Número Teléfonico':vista === 6?'Precalificación Enviada':''}}</p>
    <br>
    <div class="tp-login-input-wrapper" v-if="vista === 1">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" @keyup.enter="onSubmitId" v-model="cliente.identidad" placeholder="sin guiones"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Número de Identidad</label>
        </div>
      </div>

      <div class="tp-login-bottom">
        <button @click="onSubmitId" v-if="!loadSend"  class="tp-login-btn w-100">Enviar Identidad</button>
      </div>
    </div>

    <div class="tp-login-input-wrapper" v-else-if="vista === 2">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.identidad" disabled placeholder="sin guiones"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Número de Identidad</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.nombres" :disabled="existCliente" />
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Nombres Completos</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.apellidos" :disabled="existCliente"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Apellidos Completos</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input row">
          <div class="col">
            <input type="text" v-model="cliente.dia" placeholder="dia"/>
          </div>
          <div class="col">
            <input type="text" v-model="cliente.mes" placeholder="mes"/>
          </div>
          <div class="col">
            <input type="text" v-model="cliente.ano" placeholder="año"/>
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Fecha de Nacimiento (dd/mm/aaaa)</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.email"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Correo Electronico</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.nacionalidad"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Nacionalidad</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <div class="tp-shop-top-select">
            <ui-nice-select
                style="width: 100%"
                :options="[
          { value: 0, text: 'No' },
          { value: 1, text: 'Si' },
        ]"
                name="Seleccione un item"
                :default-current="0"
                @onChange="handleSelectTrabaja"
            />
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*¿Trabaja?</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.lugar_trabajo"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Lugar de Trabajo</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="cliente.salario"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Salario</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <div class="tp-shop-top-select">
            <ui-nice-select
                style="width: 100%"
                :options="[
          { value: 0, text: 'No' },
          { value: 1, text: 'Si' },
        ]"
                name="Select Category"
                :default-current="0"
                @onChange="handleSelect"
            />
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*¿Casa Propia?</label>
        </div>
      </div>


      <div class="tp-login-bottom">
        <button @click="onSubmitNuevoPerfil" v-if="!loadSend"  class="tp-btn tp-btn-blue w-100">{{existCliente?'Editar Perfil':'Crear Perfil'}}</button>
        <button @click="vista = 1" v-if="!loadSend"  class="tp-btn w-100">Volver Atrás</button>
      </div>
    </div>


    <div class="tp-login-input-wrapper" v-else-if="vista === 3">
      <div class="col-lg-12">
        <div class="tp-order-details" style="background-color: #4F3D97;">
          <div class="tp-order-details-top text-center mb-1">
            <div class="">
                          <span>
                            <img src="/img/lainez/techo.svg">
                          </span>
            </div>
            <div class="tp-order-details-content">
              <p>Sino seleccionaste un artículo anteriormente no te preocupes, puedes seleccionar la cantidad tu línea de tu crédito, tambien como te gustaria que fuese
                tu forma de pago, tu preferencia de pago en las fechas y si te gustaria aplicar a artículos sin prima.</p>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="precalificacion.modelo"  disabled placeholder="modelo del articulo"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Modelo del Artículo</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="precalificacion.nombreArticulo" disabled placeholder="nombre del articulo"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Nombre del Artículo</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text" v-model="precalificacion.limite" placeholder="mayor a 5,000 lps"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Limite de Crédito que te Gustaria</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <div class="tp-shop-top-select">
            <ui-nice-select
                style="width: 100%"
                :options="[
          { value: 'Pago en el piso de venta', text: 'Pago en el piso de venta' },
          { value: 'Deducción automatica con tarjeta de crédito', text: 'Deducción automatica con tarjeta de crédito' },
        ]"
                name="Select Category"
                :default-current="0"
                @onChange="handleSelectFormaPago"
            />
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Forma de Pago Preferida</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <div class="tp-shop-top-select">
            <ui-nice-select
                style="width: 100%"
                :options="[
          { value: 'Mensual', text: 'Mes - Mensual' },
          { value: 'Quincenal', text: 'Quincena - Quincenal' },
          { value: 'Semanal', text: 'Semana - Semanal' },
        ]"
                name="Select Category"
                :default-current="0"
                @onChange="handleSelectFechaPreferida"
            />
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Te gustaria abonar cada:</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <div class="tp-shop-top-select">
            <ui-nice-select
                style="width: 100%"
                :options="[
          { value: 0, text: 'No' },
          { value: 1, text: 'Si' },
        ]"
                name="Select Category"
                :default-current="0"
                @onChange="handleSelectSinPrima"
            />
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*¿Te gustaria aplicar sin prima?</label>
        </div>
      </div>


      <div class="tp-login-bottom">
        <button @click="onSubmitPrecalificacion" v-if="!loadSend"  class="tp-btn tp-btn-blue w-100">Suiguiente Paso</button>
        <button @click="vista = 2" v-if="!loadSend"  class="tp-btn w-100">Volver a los Datos del Cliente</button>
      </div>
    </div>

    <div class="tp-login-input-wrapper" v-else-if="vista === 4">
      <small>Tienes que seleccionar un documento escaneado de tu identidad o una foto. La imagen tiene que ser clara y
      totalmente visible.</small>
      <br>
      <br>
      <div class="tp-login-input-box">
        <label for="fileUpload">Buscar Foto/Archivo: </label>
        <input @change="selectFile" type="file" accept="application/pdf,image/*" id="fileUpload" />
      </div>


      <div class="tp-login-bottom">
        <button @click="validarFile" v-if="!loadSend"  class="tp-btn tp-btn-blue w-100">Pasar a la Autorización</button>
        <button @click="vista = 3" v-if="!loadSend"  class="tp-btn w-100">Volver a los Datos del Credito</button>
      </div>
    </div>

    <div class="tp-login-input-wrapper" v-else-if="vista === 5">
      <small>
        En este paso nos tienes que compartir tu número de celular vinculado a WhatsApp para poder completar la
        precalificación.
        Al colocar tu número de WhatsApp y presionar el botón enviar estas aceptando nuestros
        <a style="color: #003eff" href="">Terminos y Condiciones de Envio de Mensajes</a>.
      </small>
      <br>
      <br>
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <div class="tp-shop-top-select">
            <ui-nice-select
                style="width: 100%"
                :options="[
          { value: '504', text: '+504 - Honduras' },
          { value: '1', text: '+1 - Estados Unidos' },
          { value: '1', text: '+1 - Canada' },
          { value: '52', text: '+52 - México' },
          { value: '34', text: '+34 - España' },
        ]"
                name="Seleccione un Pais"
                :default-current="0"
                @onChange="handleSelectcodPais"
            />
          </div>
        </div>
        <div class="tp-login-input-title">
          <label for="name">*Cod. de Pais</label>
        </div>
      </div>

      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input type="text"  v-model="telefono.num" placeholder="sin guiones"/>
        </div>
        <div class="tp-login-input-title">
          <label for="name">Telefono</label>
        </div>
      </div>

      <div class="tp-login-bottom">
        <button @click="onSubmitWhat" v-if="!loadSend"  class="tp-btn tp-btn-blue w-100">Enviar</button>
        <button @click="vista = 4" v-if="!loadSend"  class="tp-btn w-100">Volver al Paso Anterior</button>
      </div>
    </div>
    <div class="tp-login-input-wrapper" v-else-if="vista === 6">
      <small>
        Muchas gracias por enviar tu precalificación. Para continuar revisa tu WhatsAap y presiona el link en el mensaje
        para validar tus datos. Sino recibiste mensaje ponte en contacto al +504 9625-2525 o +1 346 461 9433.
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useReCaptcha} from "vue-recaptcha-v3";
import {useCartStore} from "@/pinia/useCartStore";
import {toast} from "vue3-toastify";
import {MessageType} from "vscode-languageserver-protocol";
import Log = MessageType.Log;


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
const fechaActual = new Date();
const loadSend     = ref<boolean>(false);
const existCliente = ref<boolean>(false);
const existPre     = ref<boolean>(false);
const vista = ref<number>(1);
const file = ref(null);
const cliente = ref<dataFormInterfaz>({
  identidad: '',
  nombres: '',
  apellidos: '',
  fecha_nacimiento: '',
  email: '',
  nacionalidad: 'HONDUREÑA',
  salario:'0',
  lugar_trabajo: '',
  is_casa: '0',
  trabaja: '0',
  dia: fechaActual.getDate().toString(),
  mes: (fechaActual.getMonth() + 1).toString(),
  ano: fechaActual.getFullYear().toString()
})
const precalificacion = ref<dataFormPrecalificacionInterfaz>({
  modelo: '',
  nombreArticulo: '',
  limite: '0',
  sin_prima: '0',
  forma_pago: 'Pago en el piso de venta',
  fecha_preferida: 'Mensual',
  cod: null
})
const telefono = ref({
  num: '',
  cod: '504'
})

const validarIdentidad = (value:string|null):boolean|string => {
  let regexIdentidad = RegExp("^[0-9 ]*$");
  if (!value) return 'La identidad es requerida';
  if (!regexIdentidad.test(value)) return 'La identidad solo tiene que llevar números. Sin guiones y sin espacios';
  if (value?.length !== 13) return 'La identidad tiene que ser de 13 carácteres';
  return true;
}
const validarEmail = (value:string|null) => {
  let regexEmail = RegExp("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$");
  if (!value) return true;
  if (!regexEmail.test(value)) return 'El Email es invalido';
  return true;
}
const validarNombre = (value:string|null):boolean|string => {
  if (!value) return 'El nombre es requerido';
  if (value.length < 2) return 'El nombre debe ser mayor a una letra'
  else return  true;
}
const validarApellidos = (value:string|null):boolean|string => {
  if (!value) return 'El Apellido es requerido';
  if (value.length < 3) return 'El nombre debe ser mayor a 2 letras'
  else return  true;
}
const validarFecha = (ano:string, mes:string, dia:string):boolean|string => {
  let fecha = new Date(ano, mes, dia);
  if (fecha.getFullYear() == ano && fecha.getMonth() == mes && fecha.getDate() == dia)return true;
  else return 'La fecha es invalida'
}
const validarLugarTrabajar = (value:string|null):boolean|string => {
  if (!value) return 'El lugar de trabajo es requerido';
  if (value.length < 3) return 'El lugar de trabajo debe ser mayor a 2 letras'
  else return  true;
}
const validarFile = () =>{
  if (file.value)
    vista.value = 5;
  else
    toast.error('No seleccionaste un documento o foto');
}
const validarSalario = (value:string|null):boolean|string => {
  let regexSalario = RegExp("^[0-9 ]*$");
  if (!value) return 'El salario es requerido';
  if (!regexSalario.test(value)) return 'Ingresa el salario solo con numeros. Si tienes una coma o punto eliminala';
  if (value === '0') return 'El salario tiene que ser mayor a 0'
  else return  true;
}
const validarNumero = (value:string|null):boolean|string => {
  let regexNum = RegExp("^[0-9 ]*$");
  if (!value) return 'El número es requerido';
  if (!regexNum.test(value)) return 'El número solo puede contener números';
  if (value === '0') return 'El número tiene que ser mayor a 0'
  else return  true;
}
const validarCodPais = ():boolean|string =>{
  if (telefono.value.cod == '504'){
    if (telefono.value.num.length === 8)
      return true
    else
      return 'El número de Honduras debe ser de 8 digitos'
  }else if (telefono.value.cod == '1'){
    if (telefono.value.num.length === 10)
      return true
    else
      return 'El número de Canada/Estados Unidos debe ser de 10 digitos'
  }else if (telefono.value.cod == '52'){
    if (telefono.value.num.length === 10)
      return true
    else
      return 'El número de México debe ser de 10 digitos'
  }else if (telefono.value.cod == '34'){
    if (telefono.value.num.length === 9)
      return true
    else
      return 'El número de España debe ser de 9 digitos'
  }else
    return 'Dato invalido';
}
const validarLimite = (value:string|null):boolean|string => {
  let regexSalario = RegExp("^[0-9]+([,][0-9]+)?$");
  if (!value) return 'El limite es requerido';
  if (!regexSalario.test(value)) return 'Ingresa el limite solo con numeros o una coma';
  if (value === '0') return 'El limite tiene que ser mayor a 0'
  else return  true;
}

const onSubmitId = async () => {
  let valIdentidad = validarIdentidad(cliente.value.identidad);
  if (valIdentidad === true){
    loadPage.switchLoadingPage();
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('identidad', cliente.value.identidad);
    axios.post('consultar_identidad', formData).then((res:resSubmitId)=>{
      if (res.data.cliente){
        toast.success(res.data.msj);
        cliente.value.nombres   = res.data.cliente.nombres;
        cliente.value.apellidos = res.data.cliente.apellidos;
        if (res.data.cliente.fecha_nacimiento){
          let fecha = res.data.cliente.fecha_nacimiento.split('-');
          cliente.value.dia = fecha[2];
          cliente.value.mes = fecha[1];
          cliente.value.ano = fecha[0];
        }
        cliente.value.nacionalidad = res.data.cliente.nacionalidad;
        cliente.value.email        = res.data.cliente.email;
        if (res.data.cliente.is_trabaja)
          cliente.value.trabaja = res.data.cliente.is_trabaja
        cliente.value.lugar_trabajo = res.data.cliente.empresa_trabaja;
        cliente.value.salario       = res.data.cliente.salario;
        if (res.data.cliente.is_casa)
          cliente.value.is_casa = res.data.cliente.is_casa;

        existCliente.value      = true;
      }else {
        toast.error(res.data.msj);
        limpiarCliente();
      }
      vista.value             = 2;
      loadPage.switchLoadingPage();
    }).catch(()=>{
      loadPage.switchLoadingPage();
      toast.error('Hubo un error. Intenta nuevamente en un minuto!');
    })
  }else {
    toast.error(valIdentidad.toString());
  }

}

const handleSelect = (e: { value: string; text: string }) => {
  cliente.value.is_casa = e.value
};
const handleSelectTrabaja = (e: { value: string; text: string }) => {
  cliente.value.trabaja = e.value
};
const handleSelectFormaPago = (e: { value: string; text: string }) => {
  precalificacion.value.forma_pago = e.value
};
const handleSelectSinPrima = (e: { value: string; text: string }) => {
  precalificacion.value.sin_prima = e.value
};
const handleSelectFechaPreferida = (e: { value: FechaPreferidaEnum; text: string }) => {
  precalificacion.value.fecha_preferida = e.value
};
const handleSelectcodPais = (e: { value: string; text: string }) => {
  telefono.value.cod = e.value
};
const selectFile = (e)=>{
  let input = e.target.files[0];
  file.value = input;
}
const limpiarCliente = () => {
  cliente.value.nombres          = '';
  cliente.value.apellidos        = '';
  cliente.value.fecha_nacimiento = '';
  cliente.value.email            = '';
  cliente.value.nacionalidad     = 'HONDUREÑA';
  cliente.value.salario          = '0';
  cliente.value.lugar_trabajo    = '';
  existCliente.value             = false;
}

const onSubmitNuevoPerfil = async () => {
  let valEmail        = validarEmail(cliente.value.email);
  let valSalario      = validarSalario(cliente.value.salario);
  let valApellidos    = validarApellidos(cliente.value.apellidos);
  let valLugarTrabajo = validarLugarTrabajar(cliente.value.lugar_trabajo);
  let valNombres      = validarNombre(cliente.value.nombres);
  let valFecha        = validarFecha(cliente.value.ano,(cliente.value.mes-1),cliente.value.dia)
  if (valEmail === true && valSalario === true && valApellidos === true && valLugarTrabajo === true &&
      valNombres === true && valFecha === true){
    loadPage.switchLoadingPage();
    const token = await recaptcha();
    let formData = new FormData();
    let fecha    = cliente.value.ano+'-'+cliente.value.mes+'-'+cliente.value.dia
    formData.append('recaptcha-token', token);
    formData.append('identidad', cliente.value.identidad);
    formData.append('nombres', cliente.value.nombres);
    formData.append('apellidos', cliente.value.apellidos);
    formData.append('email', cliente.value.email);
    formData.append('nacionalidad', cliente.value.nacionalidad);
    formData.append('salario', cliente.value.salario);
    formData.append('lugar_trabajo', cliente.value.lugar_trabajo);
    formData.append('is_trabaja', cliente.value.trabaja);
    formData.append('is_casa', cliente.value.is_casa);
    formData.append('fecha_nacimiento', fecha);

    let url = 'nuevo_perfil'
    if (existCliente.value)
      url = 'editar_perfil'

    axios.post(url, formData).then((res:resSubmitId)=>{
      toast.success(res.data.msj);
      vista.value             = 3;
      existCliente.value      = true;
      loadPage.switchLoadingPage();
    }).catch(()=>{
      loadPage.switchLoadingPage();
      toast.error('Hubo un error. Intenta nuevamente en un momento!');
    })
  }else{
    if (valEmail !== true) toast.error(valEmail);
    if (valSalario !== true) toast.error(valSalario.toString());
    if (valApellidos !== true) toast.error(valApellidos.toString());
    if (valLugarTrabajo !== true) toast.error(valLugarTrabajo.toString());
    if (valNombres !== true) toast.error(valNombres.toString());
    if (valFecha !== true) toast.error(valFecha.toString());
  }

}

const onSubmitPrecalificacion = async () =>{
  let valLimite        = validarLimite(precalificacion.value.limite);
  if (valLimite === true){
    loadPage.switchLoadingPage();
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('identidad', cliente.value.identidad);
    formData.append('articulo_id', null);
    formData.append('limite', precalificacion.value.limite);
    formData.append('forma_pago', precalificacion.value.forma_pago);
    formData.append('fecha_abono', precalificacion.value.fecha_preferida);
    formData.append('sin_prima', precalificacion.value.sin_prima);
    let url = 'precalificacion';
    if (existPre.value)
      url = 'editar_precalificacion';

    axios.post(url, formData).then((res:resSubmitPrecalificacion)=>{
      toast.success(res.data.msj);
      precalificacion.value.cod = res.data.cod;
      vista.value = 4;
      existPre.value = true;
      loadPage.switchLoadingPage();
    }).catch(()=>{
      loadPage.switchLoadingPage();
      toast.error('Hubo un error. Intenta nuevamente en un momento!');
    })
  }else{
    if (valLimite !== true) toast.error(valLimite);
  }
}

const onSubmitWhat = async () =>{
  let valnumero    = validarNumero(telefono.value.num);
  let valcod       = validarCodPais();
  if (valnumero === true && valcod === true){
    loadPage.switchLoadingPage();
    const token = await recaptcha();
    let formData = new FormData();
    formData.append('recaptcha-token', token);
    formData.append('cod', telefono.value.cod);
    formData.append('tel', telefono.value.num);
    formData.append('cliente_id', cliente.value.identidad);
    formData.append('archivos', file.value)

    axios.post('enviar_wha', formData).then((res:resSubmitId)=>{
      toast.success(res.data.msj);
      vista.value             = 6;
      loadPage.switchLoadingPage();
    }).catch(()=>{
      loadPage.switchLoadingPage();
      toast.error('Hubo un error. Intenta nuevamente en un momento!');
    })
  }else{
    if (valnumero !== true) toast.error(valnumero);
    if (valcod !== true) toast.error(valcod);
  }
}

interface resSubmitId {
  data:{
    cliente: dataFormInterfaz | null,
    msj: string
  }
}
interface resSubmitPrecalificacion {
  data:{
    cod: string,
    msj: string
  }
}
interface dataFormInterfaz{
  nombres:string,
  identidad: string,
  apellidos: string,
  fecha_nacimiento: string,
  email: string,
  nacionalidad: string,
  salario: string,
  lugar_trabajo: string,
  trabaja: string,
  is_casa: string,
  dia: string,
  mes: string,
  ano: string
}
interface dataFormPrecalificacionInterfaz{
  modelo?: string,
  nombreArticulo?: string,
  limite: string,
  forma_pago: string,
  fecha_preferida: FechaPreferidaEnum,
  sin_prima: string,
  cod: string | null
}
enum FechaPreferidaEnum{
  'Mensual',
  'Quincenal',
  'Semanal'
}
</script>

<style scoped>
::file-selector-button {
  border: 2px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  background-color: #ff4a01;
}

::file-selector-button:hover {
  background-color: salmon;
  cursor: pointer;
}
</style>
