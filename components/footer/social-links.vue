<template>
  <a v-for="item in social_data" :key="item.id" :href="item.link">
    <i :class="item.icon"></i>
  </a>
</template>

<script setup lang="ts">
const social_data: {
  id: number;
  link: string;
  icon: string;
  title: string;
}[] = [
  {
    id: 1,
    link: "https://www.facebook.com/surtidoralainezhn?locale=es_LA",
    icon: "fa-brands fa-facebook-f",
    title: "Facebook",
  },
  {
    id: 2,
    link: "https://www.instagram.com/surtidoralainezhn/?hl=es",
    icon: "fa-brands fa-instagram",
    title: "Twitter",
  },
];
</script>
