<template>
  <div>
      <div class="row">
        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  disabled
                  placeholder="Nombres"
                  :value="cliente.nombres"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Nombres</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  disabled
                  :value="cliente.apellidos"
              />
            </div>
            <div class="tp-login-input-title">
              <label >Apellidos</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  disabled
                  :value="cliente.identidad"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Identidad</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  :value="cliente.rtn"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Rtn</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="email"
                  :value="cliente.email"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Correo Eléctronico</label>
            </div>
          </div>
        </div>


        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  disabled
                  :value="cliente.fecha_nacimiento"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Fecha de Nacimiento</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  :value="cliente.salario"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Salario</label>
            </div>
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-login-input-box m-2">
            <div class="tp-login-input">
              <input
                  type="text"
                  :value="cliente.empresa_trabajo"
              />
            </div>
            <div class="tp-login-input-title">
              <label for="email">Lugar de Trabajo</label>
            </div>
          </div>
        </div>

      </div>

      <div class="row"><div class="col-xxl-12 m-2">
        <div class="tp-login-remeber">
          <input id="is_trabajo" type="checkbox" v-model="is_trabaja" />
          <label for="is_trabajo">¿Trabajando?</label>
        </div>
      </div></div>

    <div class="row"><div class="col-xxl-12 m-2">
      <div class="tp-login-remeber">
        <input id="is_casa" type="checkbox" v-model="is_casa" />
        <label for="is_casa">¿Casa Propia?</label>
      </div>
    </div></div>

      <div class="row">
        <div class="col-xxl-12 m-2">
          <div class="profile__btn">
            <button class="tp-btn">Actualizar Datos</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {storeToRefs} from "pinia";
const {cliente, cantRecibos, cantSolicitudes, cantCuentas, loadData} = storeToRefs(useClienteStore())
const is_trabaja = ref(cliente.is_trabaja === 1);
const is_casa    = ref(cliente.is_casa === 1);
console.log(is_trabaja)
const changeHandler = (e: { value: number; text: string }, index: number) => {
  console.log(e);
};
const handleSubmit = () => {
  console.log('submitted')
}
</script>

