<template>
  <section class="tp-product-details-area">
    <div class="tp-product-details-top pb-115">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-6">
            <!-- product details thumb start -->
            <product-details-thumb
              :fotos="fotos"
            />
            <!-- product details thumb end -->
          </div>
          <!-- col end -->
          <div class="col-xl-5 col-lg-6">
            <!-- product details wrapper -->
            <product-details-wrapper :product="product" :stock="stock" :fotos="fotos"/>
            <!-- product details wrapper -->
          </div>
        </div>
      </div>
    </div>
    <div class="tp-product-details-bottom pb-140">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <product-details-tab-nav :product="product" :detalles="detalles"/>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- video modal start -->
  <modal-video/>
  <!-- video modal end -->
</template>

<script setup lang="ts">
interface fotosArticulosInterface{
  color: null | String
  isPrincipal: Number,
  url: String,
}
interface articuloInterface{
  nombre_articulo: String,
  modelo: String,
  marca: String,
  descripcion_corta: String,
  cat: String,
  precio_contado: Number,
  precio_online: Number,
  codigo_sistema: String,
  familia: String,
  Colores: [] | null | String
}
interface detalleArticulosInterface{
  titulo: String,
  detale: String
}
 const props = defineProps<{ product: articuloInterface; fotos: fotosArticulosInterface[], stock:Number, detalles: detalleArticulosInterface []}>()

</script>
