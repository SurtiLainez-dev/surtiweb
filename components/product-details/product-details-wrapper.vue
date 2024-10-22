<template>
  <div class="tp-product-details-wrapper has-sticky">
    <div class="tp-product-details-category">
      <span>{{product.cat}}</span>
    </div>
    <h3 class="tp-product-details-title">{{product.nombre_articulo}}</h3>

    <!-- inventory details -->
    <div class="tp-product-details-inventory d-flex align-items-center mb-10">
      <div class="tp-product-details-stock mb-10">
          <span>Stock: {{stock}}</span>
      </div>
    </div>
    <p>{{product.descripcion_corta}}</p>
<!--    <p v-else>{{ textMore ? product.descripcion_corta : `${product.descripcion_corta.substring(0, 10)}...` }} <span @click="textMore = !textMore">{{textMore ? 'Ver menos' : 'Ver mas'}}</span></p>-->

    <!-- price -->
    <div class="tp-product-details-price-wrapper mb-20">
      <div v-if="descuento > 0">
          <span class="tp-product-details-price old-price">L.{{ product.precio_contado }}</span>
          <span class="tp-product-details-price new-price">
            L. {{product.precio_online}}
          </span>
        </div>
      <span v-else class="tp-product-details-price new-price">L. {{ product.precio_contado }}</span>
    </div>

    <!-- variations -->
    <div class="tp-product-details-variation">
    <div class="tp-product-details-variation-item">
      <h4 class="tp-product-details-variation-title">Colores disponibles :</h4>
      <div class="tp-product-details-variation-list" v-if="product.colores">
        <button
          v-for="(item, i) in JSON.parse(product.colores)"
          :key="i"
          type="button"
          style="margin-right:5px"
          @click="cambiarFotosColor(item)"
          :class="['color', 'tp-color-variation-btn', item === productStore.colorSeleccionado ? 'active' : '']"
        >
<!--          @click="productStore.handleImageActive(item.url)"-->
          <span :data-bg-color="'#'+item" :style="`background-color: #${item}`"></span>
        </button>
      </div>
    </div>
  </div>


    <!-- actions -->
    <div class="tp-product-details-action-wrapper">
      <h3 class="tp-product-details-action-title">Quantity</h3>
      <div class="tp-product-details-action-item-wrapper d-flex align-items-center">
          <div class="tp-product-details-quantity">
            <div class="tp-product-quantity mb-15 mr-15">
                <span class="tp-cart-minus" @click="cartStore.decrement">
                  <svg-minus/>
                </span>
                <input class="tp-cart-input" type="text" :value="cartStore.orderQuantity" disabled>
                <span class="tp-cart-plus" @click="cartStore.increment">
                  <svg-plus-sm/>
                </span>
            </div>
          </div>
          <div class="tp-product-details-add-to-cart mb-15 w-100">
            <button @click="cartStore.addCartProduct(product)" class="tp-product-details-add-to-cart-btn w-100">Agregar al Carrito</button>
          </div>
      </div>
      <nuxt-link href="#" class="tp-product-details-buy-now-btn w-100 text-center">Comprar Ahora</nuxt-link>
    </div>
    <div class="tp-product-details-action-sm">
      <button  @click="wishlistStore.add_wishlist_product(product)" type="button" class="tp-product-details-action-sm-btn">
          <svg-wishlist-3/>
          Agregar a Lista de Deseos
      </button>
    </div>

    <div v-if="isShowBottom">
      <div class="tp-product-details-query">
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Familia:  </span>
          <p>{{product.familia}}</p>
      </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Categoria:  </span>
          <p>{{product.cat}}</p>
      </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Código:  </span>
          <p>{{product.codigo_sistema}}</p>
      </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Tag: </span>
          <p></p>
      </div>
      </div>
<!--    <div class="tp-product-details-social">-->
<!--      <span>Share: </span>-->
<!--      <a href="#"><i class="fa-brands fa-facebook-f"></i></a>-->
<!--      <a href="#"><i class="fa-brands fa-twitter"></i></a>-->
<!--      <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>-->
<!--      <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>-->
<!--    </div>-->
    <div class="tp-product-details-msg mb-15">
      <ul>
          <li>Puedes aplicar al credito de este articulo presionando <nuxt-link>aquí</nuxt-link></li>
          <li>Puedes solicitar ayudar por medio de Whatsapp presionando <a href="">aquí</a></li>
      </ul>
    </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/pinia/useProductStore';
import { type IProduct } from '@/types/product-type';
import { useCartStore } from "@/pinia/useCartStore";
import { useCompareStore } from "@/pinia/useCompareStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import {onMounted} from "vue";
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
  colores: [] | null | String
}
interface fotosArticulosInterface{
  color: null | String
  isPrincipal: Number,
  url: String,
}
onMounted(()=>{
  calcularDescuento();
})
// store
const compareStore = useCompareStore();
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const cartStore = useCartStore();
// props
const props = withDefaults(defineProps<{product:articuloInterface;isShowBottom?:boolean, stock: Number, fotos: fotosArticulosInterface[]}>(), {
  isShowBottom:true,
})
let textMore = ref<boolean>(false)
const descuento = ref<Number>(0)


const calcularDescuento = () =>{
  if (props.product.precio_online === 0)
    descuento.value = 0;
  else if(props.product.precio_contado >= props.product.precio_online)
    descuento.value = Number( Number(props.product.precio_contado) - Number(props.product.precio_online)).toFixed(2);
  else
    descuento.value = 0;
}

const cambiarFotosColor = (color:string) =>{
  productStore.changeColorImg(color);
  productStore.imgsSeleccionadasXColor(props.fotos);
}
</script>
