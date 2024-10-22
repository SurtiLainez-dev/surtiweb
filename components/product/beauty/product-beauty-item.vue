<template>
  <div :class="`tp-product-item-3 ${primary_style?'tp-product-style-primary':''} mb-50 ${isCenter?'text-center':''}`">
    <div
      class="tp-product-thumb-3 mb-15 fix p-relative z-index-1"
      :style="`background-color: ${style_2 ? '#f6f6f6' : '#fff'};`"
    >
      <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">
        <div style="height: 300px; width:100%;" class="d-flex justify-content-center align-items-center">
          <img :src="item.url"  style="height: 200px; width: 80%" alt="product-electronic" />
        </div>
<!--        <img :src="item.url" alt="product-img" />-->
      </nuxt-link>

      <!-- product action -->
      <div class="tp-product-action-3 tp-product-action-blackStyle">
        <div class="tp-product-action-item-3 d-flex flex-column">

          <button
            v-if="!isItemInCart(item)"
            @click="cartStore.addCartProduct(item)"
            type="button"
            :class="`tp-product-action-btn-3 tp-product-add-cart-btn ${isItemInCart(item) ? 'active' : ''}`"
          >
            <svg-cart-bag-2 />
            <span class="tp-product-tooltip">Agregar al Carrito</span>
          </button>
          <nuxt-link
            v-if="isItemInCart(item)"
            href="/cart"
            :class="`tp-product-action-btn-3 tp-product-add-cart-btn text-center ${isItemInCart(item)? 'active': ''}`"
          >
            <svg-cart-bag-2 />
            <span class="tp-product-tooltip">View Cart</span>
          </nuxt-link>

          <button
            type="button"
            class="tp-product-action-btn-3 tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.codigo_sistema}`,item)"
          >
            <svg-quick-view />
            <span class="tp-product-tooltip">Vista Rapida</span>
          </button>
          <button
            @click="wishlistStore.add_wishlist_product(item)"
            type="button"
            :class="`tp-product-action-btn-3 tp-product-add-to-wishlist-btn ${isItemInWishlist(item)? 'active': ''}`"
          >
            <svg-wishlist />
            <span class="tp-product-tooltip">
              {{ isItemInWishlist(item) ? "Remover de la lista de deseos" : "Agregar a lista de deseos" }}
            </span>
          </button>
        </div>
      </div>

      <div class="tp-product-add-cart-btn-large-wrapper">
        <button v-if="!isItemInCart(item)" @click="cartStore.addCartProduct(item)" type="button" class="tp-product-add-cart-btn-large">
          Agregar al carrito
        </button>
        <nuxt-link v-if="isItemInCart(item)" href="/cart" class="tp-product-add-cart-btn-large text-center">
          Ir al carrito
        </nuxt-link>
      </div>
    </div>
    <div class="tp-product-content-3">
      <div class="tp-product-tag-3">
        <span>{{item.familia}}</span>
      </div>
      <div class="tp-product-tag-3" style="margin-top: -10px">
        <span>{{item.cat}}</span>
      </div>
      <h3 class="tp-product-title-3">
        <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">{{ item.nombre_articulo }}</nuxt-link>
      </h3>
      <div class="tp-product-price-wrapper-3">
        <span v-if="descuento > 0" class="tp-product-price-3">
          L. {{item.precio_online.toFixed(2)}}
        </span>
        <span v-else class="tp-product-price-3">${{ item.precio_contado.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { type IProduct } from "@/types/product-type";
// props
interface articuloInterface{
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
  fotos: []
}
const props = defineProps<{ item: articuloInterface; style_2?: boolean;isCenter?: boolean;primary_style?:boolean }>();

onMounted(()=>{
  calcularDescuento();
})

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();
const descuento = ref<Number>(0)

function isItemInWishlist(product: IProduct) {
  return wishlistStore.wishlists.some((prd) => prd.id === product.id);
}

function isItemInCart(product: IProduct) {
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
