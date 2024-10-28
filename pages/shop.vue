<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb-1 :title="catStore.tituloCategoria" :subtitle="catStore.tituloCategoria" />
    <!-- breadcrumb end -->
    <shop-area v-if="!catStore.loadPage" />
  </div>
</template>

<script setup>
const axios = useNuxtApp().$axios;
import {useCategoriasStore} from "@/pinia/useCategoriasStore";
const loadPage = ref(true);

const catStore = useCategoriasStore()
onMounted(()=>{
  cargarArticulos();
})
const cargarArticulos = async () =>{
  catStore.cargarDatos();
}
</script>

<style scoped>

</style>
