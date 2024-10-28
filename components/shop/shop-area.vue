<template>
  <section
    :class="`tp-shop-area pb-120 ${full_width ? 'tp-shop-full-width-padding' : ''}`"
  >
    <div
      :class="`${full_width? 'container-fluid': shop_1600? 'container-shop': 'container'}`"
    >
      <div class="row">
<!--        <div v-if="!shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">-->
<!--          &lt;!&ndash; shop sidebar start &ndash;&gt;-->
<!--          <shop-sidebar :shop_full="full_width" :shop_1600="shop_1600" />-->
<!--          &lt;!&ndash; shop sidebar end &ndash;&gt;-->
<!--        </div>-->
        <div :class="`${shop_no_side?'col-xl-12':'col-xl-9 col-lg-8'}`">
          <div class="tp-shop-main-wrapper">
            <div class="tp-shop-top mb-45">
              <div class="row">
                <div class="col-xl-6">
                  <div class="tp-shop-top-left d-flex align-items-center">
                    <div class="tp-shop-top-tab tp-tab">
                      <ul class="nav nav-tabs" id="productTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            :class="`nav-link ${active_tab === 'grid' ? 'active' : ''}`"
                            @click="handleActiveTab('grid')"
                          >
                            <svg-grid />
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            :class="`nav-link ${active_tab === 'list' ? 'active' : ''}`"
                            @click="handleActiveTab('list')"
                          >
                            <svg-list />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div class="tp-shop-top-result">
                      <p>
                        Mostrando 1–{{ store.filteredProducts?.slice(startIndex,endIndex).length }} de
                        {{ store.filteredProducts.length }} resultados
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <shop-sidebar-filter-select
                    @handle-select-filter="store.handleSelectFilter"
                  />
                </div>
              </div>
            </div>
<!--            ///-->
            <div class="tp-shop-items-wrapper tp-shop-item-primary">
<!--              mostrando datos como frid-->
              <div v-if="active_tab === 'grid'">
                <div class="row infinite-container">
                  <div
                    v-for="item in store.filteredProducts?.slice(startIndex,endIndex)"
                    :key="item.id"
                    class="col-xl-4 col-md-6 col-sm-6 infinite-item"
                  >
                    <product-fashion-product-item
                      :item="item"
                      :spacing="true"
                    />
                  </div>
                </div>
              </div>
<!--mostrando datos como una  lista-->
              <div v-if="active_tab === 'list'">
                <div class="row">
                  <div class="col-xl-12">
                    <product-list-item
                      v-for="item in store.filteredProducts?.slice(startIndex,endIndex)"
                      :key="item.id"
                      :item="item"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="tp-shop-pagination mt-20">
              <div
                v-if="
                  store.filteredProducts && store.filteredProducts.length > 9
                "
                class="tp-pagination"
              >
                <ui-pagination
                  :items-per-page="9"
                  :data="store.filteredProducts || []"
                  @handle-paginate="handlePagination"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <!-- shop sidebar start -->
          <shop-sidebar :shop_right="shop_right_side" />
          <!-- shop sidebar end -->
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductFilterStore } from "@/pinia/useProductFilterStore";
import {useCategoriasStore} from "@/pinia/useCategoriasStore";
const catStore = useCategoriasStore;

const route = useRoute();
const props = defineProps<{
  list_style?: boolean;
  full_width?: boolean;
  shop_1600?: boolean;
  shop_right_side?: boolean;
  shop_no_side?: boolean;
}>();
onMounted(()=>{
  console.log(store.filteredProducts)
})
const active_tab = ref<string>(props.list_style ? "list" : "grid");
const store = useProductFilterStore();

let filteredProductsItems = ref<articulo[]>(store.filteredProducts!);
let startIndex = ref<number>(0);
let endIndex = ref<number>(store.filteredProducts?.length!);

const handlePagination = (data: IProduct[], start: number, end: number) => {
  filteredProductsItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};


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
function handleActiveTab(tab: string) {
  active_tab.value = tab;
}
watch(
  () => route.query || route.params,
  (newStatus) => {
    startIndex.value = 0;
    endIndex.value =
      store.filteredProducts && store.filteredProducts.length > 9 ? 9 : store.filteredProducts?.length!;
  }
);
</script>
