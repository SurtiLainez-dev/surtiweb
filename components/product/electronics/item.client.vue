<template>
  <div :class="`${offer_style ? 'tp-product-offer-item' : 'mb-25'} tp-product-item transition-3`">
    <div class="tp-product-thumb p-relative fix m-img">
      <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">
        <div style="height: 300px; width:100%;" class="d-flex justify-content-center align-items-center">
          <img :src="item.url"  style="height: 200px; width: 80%" alt="product-electronic" />
        </div>
      </nuxt-link>


      <!-- product action -->
      <div class="tp-product-action">
        <div class="tp-product-action-item d-flex flex-column">
          <button
            v-if="!isItemInCart(item)"
            type="button"
            :class="`tp-product-action-btn tp-product-add-cart-btn ${
              isItemInCart(item) ? 'active' : ''
            }`"
          >
            <svg-add-cart />
            <span class="tp-product-tooltip">Agregar al carrito</span>
          </button>
          <nuxt-link
            v-if="isItemInCart(item)"
            href="/cart"
            :class="`tp-product-action-btn tp-product-add-cart-btn ${isItemInCart(item)? 'active': ''}`"
          >
            <svg-add-cart />
            <span class="tp-product-tooltip">View Cart</span>
          </nuxt-link>

          <button
            type="button"
            class="tp-product-action-btn tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.codigo_sistema}`,item)"
          >
            <svg-quick-view />
            <span class="tp-product-tooltip">Vista Rapida</span>
          </button>
        </div>
      </div>
    </div>
    <!-- product content -->
    <div class="tp-product-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">{{item.familia}} > {{ item.cat }}</nuxt-link>
      </div>
      <div class="tp-product-category" style="margin-top: -10px">
        <span>Marca: {{item.marca}}</span>
      </div>
      <div class="tp-product-category" style="margin-top: -10px">
        <span>Modelo: {{item.modelo}}</span>
      </div>
      <div style="height: 50px">
        <h3 class="tp-product-title">
          <nuxt-link :href="`/detalle_articulo/${item.codigo_sistema}`">
            {{ (item.nombre_articulo.length < 50)?item.nombre_articulo:item.nombre_articulo.substring(0,47)+'...' }}
          </nuxt-link>
        </h3>
      </div>

      <div class="tp-product-price-wrapper">
        <div >
          <div v-if="item.precio_online > 0 && item.precio_contado > item.precio_online">
            <span class="tp-product-price old-price">L.{{ item.precio_contado }}</span>
            <span class="tp-product-price new-price">
            L. {{item.precio_online}}
          </span>
          </div>
          <span v-else class="tp-product-price new-price">L. {{ item.precio_contado }}</span>

        </div>
      </div>

      <div class="tp-product-countdown" v-if="offer_style">
        <div class="tp-product-countdown-inner">
          <ul>
            <li>
              <span>{{ timer.days }}</span> Day
            </li>
            <li>
              <span>{{ timer.hours }}</span> Hrs
            </li>
            <li>
              <span>{{ timer.minutes }}</span> Min
            </li>
            <li>
              <span>{{ timer.seconds }}</span> Sec
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { type IProduct } from "@/types/product-type";
import { useTimer, type UseTimer } from "vue-timer-hook";

interface dataTop20{
  nombre_articulo: String,
  id: Number,
  modelo: String,
  marca: String,
  url: String,
  cat: String,
  precio_online: Number,
  precio_contado: Number
  fecha_end: Date,
  codigo_sistema: String,
  familia: String
}

const props = defineProps<{ item:dataTop20, offer_style?: boolean }>();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

function isItemInWishlist(product: dataTop20) {
  return wishlistStore.wishlists.some((prd) => prd.id === product.id);
}
function isItemInCart(product: dataTop20) {
  return cartStore.cart_products.some((prd) => prd.id === product.id);
}

let timer: UseTimer;
if (props.item.fecha_end) {
  const endTime = new Date(props.item.fecha_end);
  const endTimeMs = endTime.getTime();
  timer = useTimer(endTimeMs);
}
</script>
