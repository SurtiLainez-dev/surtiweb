<template>
  <section class="tp-product-sm-area">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                Categorías Favoritas
                <SvgSectionLineSm />
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductElectronicsSmItem
                v-for="(item, index) in catTop.splice(0,3)"
                :key="item.id"
                :item="item"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                Top Artículos
                <SvgSectionLineSm />
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
<!--              <ProductElectronicsSmItem-->
<!--                v-for="item in initialState.top"-->
<!--                :key="item.id"-->
<!--                :item="item"-->
<!--              />-->
              <ThreeArtsItems v-for="item in selling_products"
                          :item="item"
                          :key="item.id"
              />
            </div>
          </div>
        </div>
<!--        <div class="col-xl-4 col-md-6">-->
<!--          <div class="tp-product-sm-list mb-50">-->
<!--            <div class="tp-section-title-wrapper mb-40">-->
<!--              <h3 class="tp-section-title tp-section-title-sm">-->
<!--                Motocicletas-->
<!--                <SvgSectionLineSm />-->
<!--              </h3>-->
<!--            </div>-->

<!--            <div class="tp-product-sm-wrapper mr-20">-->
<!--              <ProductElectronicsSmItem-->
<!--                v-for="item in selling_products"-->
<!--                :key="item.id"-->
<!--                :item="item"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useCategoriasStore} from "@/pinia/useCategoriasStore";

const {initialState} = useCategorias;
const catStore = useCategoriasStore();
import product_data from "@/data/product-data";
import {MessageType} from "vscode-languageserver-protocol";


const all_products = product_data;
const catTop = initialState.top
const discount_products = all_products
  .filter((p) => p.productType === "electronics" && p.discount > 0)
  .slice(0, 3);
const featured_products = all_products
  .filter((p) => p.productType === "electronics" && p.featured)
  .slice(0, 3);
const selling_products = all_products
  .filter((p) => p.productType === "electronics")
  .slice()
  .sort((a, b) => b.sellCount - a.sellCount)
  .slice(0, 3);
console.log(selling_products)
</script>
