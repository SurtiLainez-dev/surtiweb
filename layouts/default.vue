<template>
  <div>
    <header-two :style_2="true" />
    <main>
      <slot />
    </main>
    <footer-one :primary_style="true" />
    <back-to-top />

    <loading color="#1abc9c" width="200" height="100" v-model:active="isLoadingPage.isLoadingPage"/>
  </div>
</template>

<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {useCartStore} from "@/pinia/useCartStore";
const isLoadingPage = useCartStore()
</script>
