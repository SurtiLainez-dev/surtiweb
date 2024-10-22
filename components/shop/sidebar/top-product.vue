<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-product">
      <div v-for="(item) in articulosFinal"
           :key="item.id" class="tp-shop-widget-product-item d-flex align-items-center">
        <div class="tp-shop-widget-product-thumb">
          <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">
            <div>
              <img  :src="item.url" alt="product-img" />
            </div>
          </nuxt-link>
        </div>
        <div class="tp-shop-widget-product-content">
          <div
            class="tp-shop-widget-product-rating-wrapper d-flex align-items-center"
          >
            <div class="tp-shop-widget-product-rating">
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
              <span>
                <svg-rating/>
              </span>
            </div>
            <div class="tp-shop-widget-product-rating-number">
<!--              <span>({{item.rating}})</span>-->
            </div>
          </div>
          <h4 class="tp-shop-widget-product-title">
            <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">{{item.nombre_articulo}}</nuxt-link>
          </h4>
          <div class="tp-shop-widget-product-price-wrapper">
            <span class="tp-shop-widget-product-price">L. {{item.precio_online > 0 ?item.precio_online.toFixed(2):item.precio_contado.toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCategoriasStore} from "@/pinia/useCategoriasStore";

const catStore = useCategoriasStore()
const {initialState} = useCategorias
interface articulo{
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
  fotos: [],
  stock: Number
}

let topRatedProducts: articulo[] = initialState.top20.filter((item, i)=>item.cat !== catStore.tituloCategoria)
let articulosFinal:   articulo[] = topRatedProducts.filter((item, i)=>i < 5);
console.log(topRatedProducts)
//   .map((product) => {
//     if (product.reviews && product.reviews.length > 0) {
//       const totalRating = product.reviews.reduce(
//         (sum:number, review:IReview) => sum + review.rating,
//         0
//       );
//       const averageRating = totalRating / product.reviews.length;
//
//       return {
//         product,
//         rating: parseFloat(averageRating.toFixed(1)),
//       };
//     }
//     return undefined; // Return undefined for products with no reviews
//   })
//   .filter(
//     (product): product is { product: IProduct; rating: number } =>
//       product !== undefined
//   );
//
// if (topRatedProducts.length > 0) {
//   topRatedProducts = topRatedProducts
//     .slice()
//     .sort((a, b) => b.rating - a.rating)
//     .slice(0, 4);
// }

</script>
