<template>
  <div class="tp-shop-sidebar mr-10">
    <!-- filter -->
    <div class="tp-shop-widget mb-35">
      <h3 class="tp-shop-widget-title no-border">Filtrar Precio</h3>
      <!-- price filter start -->
      <shop-sidebar-price-filter
        :right_side="shop_right"
        :shop_full="shop_full"
        :shop_1600="shop_1600"
      />
      <!-- price filter end -->
    </div>
    <!-- status -->
<!--    <div class="tp-shop-widget mb-50">-->
<!--      <h3 class="tp-shop-widget-title">Product Status</h3>-->
<!--      &lt;!&ndash; filter status start &ndash;&gt;-->
<!--      <shop-sidebar-filter-status-->
<!--        :right_side="shop_right"-->
<!--        :shop_full="shop_full"-->
<!--        :shop_1600="shop_1600"-->
<!--      />-->
<!--      &lt;!&ndash; filter status end &ndash;&gt;-->
<!--    </div>-->
    <!-- categories -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Categorias</h3>
      <!-- filter categories start -->
      <shop-sidebar-filter-categories
        :right_side="shop_right"
        :shop_full="shop_full"
        :shop_1600="shop_1600"
      />
      <!-- filter categories end -->
    </div>
    <!-- product rating -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Producto Destacado</h3>
      <!-- filter top-product start -->
      <shop-sidebar-top-product />
      <!-- filter top-product end -->
    </div>
    <!-- brand -->
<!--    <div class="tp-shop-widget mb-50">-->
<!--      <h3 class="tp-shop-widget-title">Popular Brands</h3>-->
<!--      &lt;!&ndash; filter brand start &ndash;&gt;-->
<!--      <shop-sidebar-filter-brand-->
<!--        :right_side="shop_right"-->
<!--        :shop_full="shop_full"-->
<!--        :shop_1600="shop_1600"-->
<!--      />-->
<!--      &lt;!&ndash; filter brand end &ndash;&gt;-->
<!--    </div>-->
    <!-- reset filter start -->
    <shop-sidebar-reset-filter
      :right_side="shop_right"
      :shop_full="shop_full"
      :shop_1600="shop_1600"
    />
    <!-- reset filter end -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  shop_right?: boolean;
  shop_full?: boolean;
  shop_1600?: boolean;
}>();
</script>
