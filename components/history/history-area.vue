<template>
  <section class="tp-history-area pt-140 pb-140" style="background-color: #f8f8f8">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-history-slider mb-50">
            <Swiper
              :slidesPerView="1"
              :spaceBetween="0"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="[FreeMode, Thumbs, EffectFade]"
              :effect="'fade'"
              class="tp-history-slider-active swiper-container"
            >
              <SwiperSlide
                v-for="(item, i) in slider_data"
                :key="i"
                class="tp-thistory-item"
                style="background-color: #f8f8f8"
              >
                <div class="row">
                  <div class="col-xl-5 col-lg-6 col-md-6">
                    <div class="tp-history-wrapper pr-45">
                      <div class="tp-history-content mb-40">
                        <h3 class="tp-history-title" v-html="item.title"></h3>
                        <p>
                          {{item.subtitle_1}}
                        </p>
                        <p>
                          {{ item.subtitle_2 }}
                        </p>
                      </div>
                      <div class="tp-history-year">
                        <p>{{item.year}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-7 col-lg-6 col-md-6">
                    <div class="tp-history-thumb-wrapper ml-150 p-relative">
                      <div class="tp-history-thumb m-img">
                        <img :src="item.img" alt="thumb_img" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <div class="tp-history-nav">
        <div class="row">
          <div class="col-xl-12">
            <Swiper
              class="tp-history-nav-active swiper-container"
              @swiper="setThumbsSwiper"
              :spaceBetween="220"
              :slidesPerView="4"
              :freeMode="true"
              :watchSlidesProgress="true"
              :modules="[FreeMode, Thumbs]"
            >
              <SwiperSlide
                v-for="(num, i) in slider_nav_data"
                :key="i"
                class="tp-history-nav-year text-center"
              >
                <p>{{ num }}</p>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Thumbs, EffectFade } from "swiper/modules";

let thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

// slider data
const slider_data: {
  subtitle_1: string;
  subtitle_2: string;
  title: string;
  img: string;
  thumb_text: string;
  year: number;
}[] = [
  {
    title: "Nuestro Comienzo",
    subtitle_1:
      "La apertura de la primera sucursal fué en Barrio Rio Negro, abajo del precidió en Trujillo, Colón",
    subtitle_2:
      "Fué nuestro hogar hasta el año 2005",
    img: "/img/lainez/APERTURA.png",
    thumb_text: "",
    year: 2000,
  },
  {
    title: "Nuestro Primer Año",
    subtitle_1:
      "Surtidora Laínez fué recibida con los brazos abiertos en el pueblo de Trujillo",
    subtitle_2:
      "Cuando cumplimos el primer año empezamos a vender eléctrodomesticos y camas",
    img: "/img/lainez/ANIVERSARIO.png",
    thumb_text: "Welcome to our <br> Shofy eCommerce Theme",
    year: 2001,
  },
  {
    title: "Nuestra Segunda Sucursal",
    subtitle_1:
      "Gracias a la buena administración de los fundadores de la mano de Dios que nunca nos ha abandonado, Surtidora" +
        " Lainez abrió su segunda sucursal en la ciudad de Trujillo",
    subtitle_2:
      "Esta sucursal estuvo ubicada en Rio Negro, al frente de donde era la gasolinera Shell",
    img: "/img/lainez/SEGUNDA SUCURSAL.png",
    thumb_text: "Welcome to our <br> Shofy eCommerce Theme",
    year: 2005,
  },
  {
    title: "Nuestra Expansión",
    subtitle_1:
      "En el año 2015 Surtidora Laínez comenzó su expansión a otras ciudades ofreciendo artículos y servicio de calidad a todos nuestros clientes. La ciudad de San Esteban fué nuestra primera sucursal fuera de la ciudad de Trujillo.",
    subtitle_2:
      "Actualmente tenemos presencia en los departamentos de Olancho, Yoro y Colón",
    img: "/img/lainez/EXPANSION.png",
    thumb_text: "Welcome to our <br> Shofy eCommerce Theme",
    year: 2015,
  },
];

// slider nav data
const slider_nav_data: number[] = [2000, 2001, 2005, 2015];
</script>
