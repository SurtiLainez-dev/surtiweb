<template>
  <div>
    <header-two :style_2="true" />
    <main>
      <slot />
    </main>
    <footer-one :primary_style="true" />
    <back-to-top />

    <loading color="#1abc9c" width="200" height="100" v-model:active="isLoadingPage.isLoadingPage"/>
    <loading color="#1abc9c" width="200" height="100" v-model:active="useAuth.loading"/>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Lainez Online" });
import Loading from 'vue-loading-overlay';
import {useAuthStore} from "@/pinia/useAuthStore";
const useAuth = useAuthStore();
import {useCartStore} from "@/pinia/useCartStore";
const isLoadingPage = useCartStore();
import 'vue-loading-overlay/dist/css/index.css';
</script>
