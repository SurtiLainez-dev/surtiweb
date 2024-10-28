<template>
  <div v-if="initialState.articulo">

    <product-details-breadcrumb :product="initialState.articulo" />

<!--    &lt;!&ndash; product details area start &ndash;&gt;-->
    <product-details-area :product="initialState.articulo" :fotos="initialState.fotos" :stock="initialState.stock" :detalles="initialState.detalles"/>
<!--    &lt;!&ndash; product details area end &ndash;&gt;-->

<!--    &lt;!&ndash; related products start &ndash;&gt;-->
    <product-related :products="initialState.articulosSimilares" />
    <!-- related products end -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from "vue";
import {useProductStore} from "@/pinia/useProductStore";
interface fotosArticulosInterface{
  color: null | String
  isPrincipal: Number,
  url: String,
}

const axios = useNuxtApp().$axios;
const route = useRoute()
const loadPage = ref<boolean>(true);
const productStore = useProductStore();
const {addArticulo, initialState, asignarArticulosSimilares} = useCategorias;
onMounted(()=>{
  cargarArticulo();
  cargarArticulosSimilares();
});

const cargarArticulo = () =>{
  axios.get('articulo/'+route.params.id).then(res=>{
    loadPage.value = false;
    addArticulo(res.data.articulo, res.data.fotos, res.data.stock, res.data.detalles);
    if (res.data.fotos){
      let fotoPrincipal:fotosArticulosInterface[] = res.data.fotos.filter((item:fotosArticulosInterface)=>item.isPrincipal === 1);
      if (fotoPrincipal.length > 0){
        productStore.activeImg = fotoPrincipal[0].url.toString();
        productStore.colorSeleccionado = fotoPrincipal[0].color.toString();
        productStore.imgsSeleccionadasXColor(res.data.fotos)
      }
    }
  }).catch(error=>{
    loadPage.value = false;
  })
}

const cargarArticulosSimilares = () =>{
  axios.get('articulos/familia/'+route.params.id).then(res=>{
    asignarArticulosSimilares(res.data.articulos);
  })
}
</script>

<style scoped>

</style>
