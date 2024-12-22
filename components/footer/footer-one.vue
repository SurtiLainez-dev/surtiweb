<template>
  <footer>
    <div :class="`tp-footer-area ${primary_style?'tp-footer-style-2 tp-footer-style-primary tp-footer-style-6':''} ${style_2 ?'tp-footer-style-2':style_3 ? 'tp-footer-style-2 tp-footer-style-3': ''}`" :data-bg-color="`${style_2?'footer-bg-white':style_3?'footer-bg-white':'footer-bg-grey'}`">
      <div class="tp-footer-top pt-95 pb-40">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-1 mb-50">
                <div class="tp-footer-widget-content">
                  <div class="tp-footer-logo">
                    <nuxt-link href="/">
                      <img style="width: 200px" src="/img/lainez/LAINEZ%20%20PNG.png" alt="logo">
                    </nuxt-link>
                  </div>
                  <p class="tp-footer-desc">Somos una empresa totalmente Hondureña, orgullosamente Coloneña que provee
                    artículos para el hogar, motocicletas y productos financieros a todos los hondureños desde el año 2,000
                  </p>
                  <div class="tp-footer-social">
                    <!-- social links -->
                    <footer-social-links/>
                    <!-- social links -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-2 mb-50">
                <h4 class="tp-footer-widget-title">Surti Lainez Online</h4>
                <div class="tp-footer-widget-content">
                  <ul>
                    <li><a href="#">Mi Carrito</a></li>
                    <li><a href="#">Mi Lista de Deseos</a></li>
                    <li><a href="#">Mi Cuenta</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-3 mb-50">
                <h4 class="tp-footer-widget-title">Infomación</h4>
                <div class="tp-footer-widget-content">
                  <ul>
                    <li><a href="/surti/historia">Nuestra Historia</a></li>
                    <li><a href="/surti/ubicaciones">Sucursales</a></li>
                    <li><a href="/politicas_privacidad">Politicas de Privacidad</a></li>
                    <li><a href="/terminos">Términos y Condiciones de Uso</a></li>
<!--                    <li><a href="#">Politicas de Tilk Mobile</a></li>-->
<!--                    <li><a href="#">Conoce TILK</a></li>-->
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-4 mb-50">
                <h4 class="tp-footer-widget-title">Contactanos</h4>
                <div class="tp-footer-widget-content">
                  <div class="tp-footer-talk mb-20">
                    <span>¿Tienes una pregunta? Llamanos desde Honduras al</span>
                    <h4><a href="tel:670-413-90-762">+504 9625-2525</a></h4>
                    <span>¿Tienes una pregunta y estas en Estados Unidos? Tambien puedes llamarnos al</span>
                    <h4><a href="tel:670-413-90-762">+1 346-461-9433</a></h4>
                  </div>
                  <!-- footer contact start -->
                  <footer-contact/>
                  <!-- footer contact end -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- bottom area start -->
      <footer-bottom-area/>
      <!-- bottom area end -->
  </div>
</footer>
</template>

<script setup lang="ts">
defineProps<{ primary_style?: boolean; style_2?: boolean;style_3?: boolean; }>();
</script>
