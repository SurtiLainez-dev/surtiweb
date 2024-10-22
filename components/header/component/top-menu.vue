<template>
  <div class="tp-header-top-menu d-flex align-items-center justify-content-end">
    <div class="tp-header-top-menu-item tp-header-setting">
      <span @click="handleActive('setting')" class="tp-header-setting-toggle" id="tp-header-setting-toggle">Mi Perfil</span>
      <ul :class="`${isActive === 'setting' ? 'tp-setting-list-open' : ''}`">
        <li>
          <nuxt-link href="/profile">Mis Datos</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/wishlist">Mis Direcciones</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/cart">Mis Telefonos</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/login">Cerrar Sesión</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
let isActive = ref<string>('')
  // handle active
  const handleActive = (type:string) => {
    if(type === isActive.value){
      isActive.value = ''
    }
    else {
      isActive.value = type
    }
  }
</script>
