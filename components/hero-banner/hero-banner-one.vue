<template>
  <section class="tp-slider-area p-relative z-index-1">
    <Swiper
      :slidesPerView="1"
      :spaceBetween="30"
      :loop="false"
      :navigation="{
        nextEl: '.tp-slider-button-next',
        prevEl: '.tp-slider-button-prev',
      }"
      :pagination="{
        el: '.tp-slider-dot',
        clickable: true,
      }"
      :effect="'fade'"
      :modules="[Navigation, Pagination, EffectFade]"
      :onSlideChange="(swiper) => handleActiveIndex(swiper.activeIndex)"
      :class="`tp-slider-active tp-slider-variation swiper-container ${
        isActive ? 'is-light' : ''
      }`"
    >

      <SwiperSlide
        v-for="(item,i) in initialState.banners"
        :key="i"
        class="tp-slider-item tp-slider-height d-flex align-items-center dark"
        :style="'background-color: #'+item.color"
      >
        <div class="tp-slider-shape">
          <img
            class="tp-slider-shape-1"
            src="https://ign-surti.nyc3.digitaloceanspaces.com/web/diesnos%20web%20(5).png"
            alt="slider-shape"
          />
          <img
            class="tp-slider-shape-2"
            src="/img/slider/shape/slider-shape-2.png"
            alt="slider-shape"
          />
          <img
            class="tp-slider-shape-3"
            src="/img/slider/shape/slider-shape-3.png"
            alt="slider-shape"
          />
          <img
            class="tp-slider-shape-4"
            src="/img/slider/shape/slider-shape-4.png"
            alt="slider-shape"
          />
        </div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-5 col-lg-6 col-md-6">
              <div class="tp-slider-content p-relative z-index-1">
                <span>
                  {{ item.pre_titulo }}
                    <b v-if="item.pre_precio > 0">L{{ item.pre_precio.toFixed(2) }}</b>
                </span>
                <h3 class="tp-slider-title">{{ item.detalle }}</h3>
                <p>
                  {{ item.sub_title_1 }}
                  <span v-if="item.sub_precio && item.sub_precio > 0"
                    > L. {{ item.sub_precio.toFixed(2) }}
                    <SvgOfferLine />
                  </span>
                  {{item.sub_title_2}}
                </p>

                <div v-if="item.btn" class="tp-slider-btn">
                  <nuxt-link :href="item.ruta" class="tp-btn tp-btn-2 tp-btn-white">
                    {{item.btn_titulo}}
                    <SvgRightArrow />
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-xl-7 col-lg-6 col-md-6">
              <div class="tp-slider-thumb text-end">
                <img :src="item.img" alt="slider-img" />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div class="tp-slider-arrow tp-swiper-arrow d-none d-lg-block">
        <button type="button" class="tp-slider-button-prev">
          <SvgPrevArrow />
        </button>
        <button type="button" class="tp-slider-button-next">
          <SvgNextArrow />
        </button>
      </div>
      <div class="tp-slider-dot tp-swiper-dot"></div>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
const { initialState } = useCategorias;
// type
// slider data
const sliderData = [
  {
    id: 1,
    pre_title: { text: "Cargando...", price: 0},
    title: "Cargando...",
    subtitle: {
      text_1: "Cargando...",
      price: 0,
      text_2: null,
    },
    img: null,
    green_bg: true,
    clic: false,
    btn_title: null
  },
];
let isActive = ref<boolean>(false);
const handleActiveIndex = (index: number) => {
  if (index === 2) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
};
</script>
