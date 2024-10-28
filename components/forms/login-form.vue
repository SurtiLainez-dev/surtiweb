<template>
  <div>
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input
            type="email"
            placeholder=""
            v-model="user.username"
          />
        </div>
        <div class="tp-login-input-title">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input
              :type="showPass ? 'text' : 'password'"
              name="password"
              v-model="user.password"
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
    </div>
    <div
      class="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20"
    >
      <div class="tp-login-remeber">

      </div>
      <div class="tp-login-forgot">
        <nuxt-link href="/forgot">¿Olvidó su contraseña?</nuxt-link>
      </div>
    </div>
    <div class="tp-login-bottom">
      <button  class="tp-login-btn w-100" @click="login">Iniciar Sesión {{useAuth.loading}}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/pinia/useAuthStore";
const useAuth = useAuthStore();

let showPass = ref<boolean>(false);

const state = reactive({
  sendReq: false,
})

const user = ref({
  username: 'williams_santos@grupolainez.com',
  password: '1998wdsl@@',
});

const login = async () => {
  await useAuth.authenticateUser(user.value);
  //
  // if (authenticated)
  //   navigateTo('/profile')

}

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};


</script>
