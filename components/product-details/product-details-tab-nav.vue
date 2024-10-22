<template>
  <div class="tp-product-details-tab-nav tp-tab">
    <nav>
      <div class="nav nav-tabs justify-content-center p-relative tp-product-tab" id="navPresentationTab" role="tablist">
        <button @click="handleActiveMarker($event)" class="nav-link active" id="nav-addInfo-tab" data-bs-toggle="tab" data-bs-target="#nav-addInfo" type="button" role="tab" aria-controls="nav-addInfo" aria-selected="false">Detalles del Artículo</button>
        <button @click="handleActiveMarker($event)" class="nav-link" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true">Descripción</button>


        <span id="productTabMarker" class="tp-product-details-tab-line"></span>
      </div>
    </nav>
    <div class="tab-content" id="navPresentationTabContent">
      <div class="tab-pane fade show active" id="nav-addInfo" role="tabpanel" aria-labelledby="nav-addInfo-tab" tabindex="0">
        <div class="tp-product-details-additional-info ">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <table>
                <tbody>
                <tr v-for="(info,i) in detalles" :key="i">
                  <td>{{info.titulo}}</td>
                  <td>{{info.detalle}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" tabindex="0">
          <div class="tp-product-details-desc-wrapper pt-80">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                  <div class="tp-product-details-desc-item pb-105">
                      <div class="row">
                        <div class="col-lg-12">
                            <div class="tp-product-details-desc-content pt-25">
                              <span>{{product.cat}}</span>
                              <h3 class="tp-product-details-desc-title">{{product.nombre_articulo}}</h3>
                              <p>{{ product.descripcion_corta }}</p>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
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
interface detalleArticulosInterface{
  titulo: String,
  detalle: String
}
// handleActiveMarker
const handleActiveMarker = (event: MouseEvent) => {
  const marker = document.getElementById("productTabMarker");
  if (marker && event.target) {
    marker.style.left = (event.target as HTMLButtonElement).offsetLeft + "px";
    marker.style.width = (event.target as HTMLButtonElement).offsetWidth + "px";
  }
};

 defineProps<{product:articuloInterface, detalles: detalleArticulosInterface[]}>();

onMounted(() => {
  const nav_active = document.getElementById("nav-addInfo-tab");
  const marker = document.getElementById("productTabMarker");
  if (nav_active?.classList.contains("active") && marker) {
    marker.style.left = nav_active.offsetLeft + "px";
    marker.style.width = nav_active.offsetWidth + "px";
  }
});
</script>
