<template>
  <section class="tp-related-product pt-95 pb-120">
    <div class="container">
      <div class="row">
        <div class="tp-section-title-wrapper-6 text-center mb-40">
          <h3 class="tp-section-title-6">Productos Relacionados</h3>
        </div>
      </div>
      <div class="row">
        <div class="tp-product-related-slider">
          <swiper
            v-bind="slider_setting"
            :modules="[Scrollbar]"
            class="tp-product-related-slider-active swiper-container mb-10"
          >
            <swiper-slide v-for="(item, i) in products" :key="i">
              <product-beauty-item :item="item" :primary_style="true" :style_2="true" />
            </swiper-slide>
          </swiper>
          <div class="tp-related-swiper-scrollbar tp-swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar } from "swiper/modules";
interface articuloInterface{
  nombre_articulo: String,
  id: Number,
  modelo: String,
  marca: String,
  url: String,
  cat: String,
  precio_online: Number,
  precio_contado: Number,
  fecha_end: Date,
  codigo_sistema: String,
  fotos: []
}
// props
const props = defineProps<{ products: articuloInterface[] }>();

// slider_setting
const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 24,
  enteredSlides: false,
  scrollbar: {
    el: ".tp-related-swiper-scrollbar",
    draggable: true,
    dragClass: "tp-swiper-scrollbar-drag",
    snapOnRelease: true,
  },
  breakpoints: {
    "1200": {
      slidesPerView: 4,
    },
    "992": {
      slidesPerView: 3,
    },
    "768": {
      slidesPerView: 2,
    },
    "576": {
      slidesPerView: 2,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};
</script>
