<template>
  <section class="tp-login-area pb-140 p-relative z-index-1 fix">
    <div class="tp-login-shape">
        <img class="tp-login-shape-1" src="/img/login/login-shape-1.png" alt="shape">
        <img class="tp-login-shape-2" src="/img/login/login-shape-2.png" alt="shape">
        <img class="tp-login-shape-3" src="/img/login/login-shape-3.png" alt="shape">
        <img class="tp-login-shape-4" src="/img/login/login-shape-4.png" alt="shape">
    </div>
    <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8">
              <div class="tp-login-wrapper">
                <div class="tp-login-top text-center mb-30">
                    <h3 class="tp-login-title">Creando Cuenta en Surti Lainez Online</h3>
                    <p>¿Tienes cuenta?  <span><nuxt-link href="/login">Inicia Sesión</nuxt-link></span></p>
                </div>
                <div class="tp-login-option">
                    <div class="tp-login-mail text-center mb-40">
                      <p></p>
                    </div>
                    <!-- form start -->
                    <forms-register-form/>
                    <!-- form end -->
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>
