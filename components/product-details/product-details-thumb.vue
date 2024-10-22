<template>
  <div class="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
    <nav>
      <div
        class="nav nav-tabs flex-sm-column"
        id="productDetailsNavThumb"
        role="tablist"
      >
        <div class="d-flex justify-content-center">
          <button
              type="button"
              class="tp-product-action-btn tp-product-quick-view-btn"
              v-if="productStore.activeLessFiveImgs" @click="moverFotos(0)">
            <lazy-svg-slider-btn-prev/>
            <span class="tp-product-tooltip">Subir</span>
          </button>
        </div>
        <button
          v-for="(item, i) in productStore.imgsView"
          :key="i"
          @click="productStore.handleImageActive(item.url)"
          :class="`nav-link ${item.url === productStore.activeImg ? 'active' : ''}`"
        >
          <img :src="item.url" alt="nav-img" />
        </button>
        <div class="d-flex justify-content-center">
          <button
              type="button"
              class="tp-product-action-btn tp-product-quick-view-btn"
              v-if="productStore.activeMoreFiveImgs" @click="moverFotos(1)">
            <lazy-svg-slider-btn-next/>
            <span class="tp-product-tooltip">Ver mas fotos</span>
          </button>
        </div>
      </div>
    </nav>
    <div class="tab-content m-img" id="productDetailsNavContent">
      <div>
        <div
          class="tp-product-details-nav-main-thumb"
          style="background-color: #f5f6f8"
        >
          <img :src="productStore.activeImg" alt="prd-image" />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useProductStore } from "@/pinia/useProductStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";

interface fotosArticulosInterface{
  color: null | String
  isPrincipal: Number,
  url: String,
}
// props
const props = defineProps<{ fotos: fotosArticulosInterface[] }>();

const productStore = useProductStore();
const utilsStore = useUtilityStore();
const moverFotos = (tipo:number)=>{
//   1 sube
//   0 baja
  productStore.verMasImagenes(tipo, props.fotos);
}
</script>
