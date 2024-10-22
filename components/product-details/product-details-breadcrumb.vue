<template>
  <section class="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
    <div class="container">
        <div class="row">
          <div class="col-xxl-12">
              <div class="breadcrumb__content p-relative z-index-1">
                <div class="breadcrumb__list has-icon">
                    <span class="breadcrumb-icon me-1">
                      <svg-dot/>
                    </span>
                    <span><a href="/">INICIO</a></span>
                    <span><a href="#">{{product.familia.toUpperCase()}}</a></span>
                    <span><a href="#">{{product.cat.toUpperCase()}}</a></span>
                    <span>{{product.nombre_articulo.toUpperCase()}}</span>
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
defineProps<{product:articuloInterface}>()
</script>
