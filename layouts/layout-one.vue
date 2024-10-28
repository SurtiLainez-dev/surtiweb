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
  <div v-else >
    <div  style="display: flex;width: 100vw;height: 100vh;justify-content: center;align-items: center; background-color: rgb(200,200,200);">
      <div class="d-flex" style=" border-radius:100px; width:50%; display:flex;justify-content: center;align-items: center;">
        <div style=" display:flex;justify-content: center;align-items: center;">
          <img class="justify-center" width="30%" height="30%" src="/img/lainez/LOADING%20LAINEZ.gif" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from "vue";
import 'vue-loading-overlay/dist/css/index.css';
import {useCartStore} from "@/pinia/useCartStore";
const isLoadingPage = useCartStore()
const axios = useNuxtApp().$axios;
const {addCategorias, addTop, addBanners, addTop20, initialState} = useCategorias;
const loadPage = ref<boolean>(true);



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
