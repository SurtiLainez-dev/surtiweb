<template>
  <div v-if="!loadPage">
<!--    Este es el de electronicos-->
    <header-one />
    <main>
      <slot />
    </main>
    <footer-one />
    <back-to-top />
    <!-- <modal-product /> -->

  </div>
  <div v-else>
    <h6>Cargando...</h6>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {useCartStore} from "@/pinia/useCartStore";
const isLoadingPage = useCartStore()
const loadPage = ref<boolean>(true);
const axios = useNuxtApp().$axios;
const {addCategorias, addTop, addBanners, addTop20, initialState} = useCategorias;

onMounted(()=>{
  cargarDataInit();
  cargarTop();
})

const cargarDataInit = () =>{
  axios.get('data_init').then((res)=>{
    loadPage.value = false;
    addCategorias(res.data.menu);
    addTop(res.data.topFive);
    addBanners(res.data.banners);
  });
}

const cargarTop = () =>{
  axios.get('top_20').then((res)=>{
    addTop20(res.data.articulos);
  });
}
</script>
