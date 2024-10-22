<template>
  <div class="tp-product-list-item d-md-flex tp-product-item">
    <div class="tp-product-list-thumb p-relative fix" style="background-color: #f2f3f5">
      <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">
        <div style="height: 300px; width:100%;" class="d-flex justify-content-center align-items-center">
          <img :src="item.url"  style="height: 200px; width: 80%" alt="product-electronic" />
        </div>
      </nuxt-link>
      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
        <div class="tp-product-action-item-2 d-flex flex-column">
          <button
            type="button"
            class="tp-product-action-btn-2 tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.codigo_sistema}`,item)"
          >
            <svg-quick-view />
            <span class="tp-product-tooltip tp-product-tooltip-right">Vista rapida</span>
          </button>

          <button
            @click="wishlistStore.add_wishlist_product(item)"
            type="button"
            :class="`tp-product-action-btn-2 tp-product-add-to-wishlist-btn ${wishlistStore.wishlists.some((prd) => prd.id === item.id) ? 'active': ''}`"
          >
            <svg-wishlist />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{isItemInWishlist(item) ? 'Remover de la lista de deseos' : 'Agregar a la lista de deseos'}}
            </span>
          </button>

        </div>
      </div>
    </div>
    <div class="tp-product-list-content">
      <div class="tp-product-content-2 pt-15">
        <div class="tp-product-tag-2">
          <a href="#">{{ item.familia }}</a>
        </div>
        <div class="tp-product-tag-2">
          <a href="#">{{ item.cat }}</a>
        </div>
        <h3 class="tp-product-title-2">
          <nuxt-link :href="`/product-details/${item.id}`">{{ item.nombre_articulo }}</nuxt-link>
        </h3>
        <div class="tp-product-rating-icon tp-product-rating-icon-2">
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
        </div>

        <div class="tp-product-price-wrapper-2">
          <div v-if="descuento > 0">
            <span class="tp-product-price-2 new-price">L. {{(item.precio_online).toFixed(2)}} {{ " " }}</span>
            <span class="tp-product-price-2 old-price">
              L. {{ item.precio_contado}}
            </span>
          </div>
          <span v-else class="tp-product-price-2 new-price">L. {{ item.precio_contado.toFixed(2) }}</span>
        </div>

        <p>{{ item.descripcion_corta }}</p>
        <div class="tp-product-list-add-to-cart">
          <button v-if="!isItemInCart(item)" @click="cartStore.addCartProduct(item)" class="tp-product-list-add-to-cart-btn">Agregar al carrito</button>
          <nuxt-link to="/cart" v-if="isItemInCart(item)" class="tp-product-list-add-to-cart-btn">
            Ver carrito
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useUtilityStore } from "@/pinia/useUtilityStore";
import { useCompareStore } from "@/pinia/useCompareStore";
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";

const props = defineProps<{ item: articuloInterface }>();
const descuento = ref<number>(0)
const compareStore = useCompareStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();
export interface articuloInterface{
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
onMounted(()=>{
  calcularDescuento();
})
function isItemInWishlist(product: articuloInterface) {
  return wishlistStore.wishlists.some((prd) => prd.id === product.id);
}
function isItemInCompare(product: articuloInterface) {
  return compareStore.compare_items.some((prd) => prd.id === product.id);
}
function isItemInCart(product: articuloInterface) {
  return cartStore.cart_products.some((prd) => prd.id === product.id);
}
const calcularDescuento = () =>{
  if (props.item.precio_online === 0)
    descuento.value = 0;
  else if(props.item.precio_contado >= props.item.precio_online)
    descuento.value = 0;
  else
    descuento.value = Number( Number(props.item.precio_contado) - Number(props.item.precio_online)).toFixed(2);
}
</script>
