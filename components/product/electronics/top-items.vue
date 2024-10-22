<template>
  <section class="tp-product-area pb-55">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-xl-5 col-lg-6 col-md-5">
          <div class="tp-section-title-wrapper mb-40">
            <h3 class="tp-section-title">Lo Mas Vendidos
<!--              <SvgSectionLine />-->
            </h3>
          </div>
        </div>
        <div class="col-xl-7 col-lg-6 col-md-7">
          <div class="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
            <ul class="nav nav-tabs justify-content-sm-end" id="productTab">
              <li v-for="(tab, i) in tabs" :key="i" class="nav-item">
                <button @click="handleActiveTab(tab)" :class="`nav-link ${active_tab === tab ? 'active' : ''}`">{{ tab }}
                  <span class="tp-product-tab-line">
                    <SvgActiveLine />
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-product-tab-content">
            <div class="row">
              <div v-for="(item,i) in initialState.top20" :key="i" class="col-xl-3 col-lg-3 col-sm-6">
                <ProductElectronicsItem :item="item" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
const {initialState} = useCategorias

let active_tab = ref('Favoritos')

const tabs = ["Favoritos"];
// handleActiveTab
const handleActiveTab = (tab: string) => {
  active_tab.value = tab;
};


onMounted(() => {})
</script>
