<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
    <modal-product/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProductFilterStore } from './pinia/useProductFilterStore';
import { useUtilityStore } from './pinia/useUtilityStore';

const route = useRoute();
const prdFilterStore = useProductFilterStore();
const utilsStore = useUtilityStore();
useSeoMeta({
  title: 'Surtidora Lainez',
  ogTitle: 'Surti Lainez',
  description: 'Electrodimesticos, Muebles de Madera, Motocicletas, Impresoras y Laptos',
  ogDescription: 'Electrodimesticos, Muebles de Madera, Motocicletas, Impresoras y Laptos',
})
watch(() => route.path, () => {
  prdFilterStore.$reset
  prdFilterStore.handleResetFilter();
  utilsStore.removeBackdrop();
})
</script>
