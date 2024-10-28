<template>
  <div class="tp-header-top-menu d-flex align-items-center justify-content-end">
    <div class="tp-header-top-menu-item tp-header-setting">
      <span @click="handleActive('setting')" class="tp-header-setting-toggle" id="tp-header-setting-toggle">Mi Perfil</span>
      <ul :class="`${isActive === 'setting' ? 'tp-setting-list-open' : ''}`">
        <li>
          <nuxt-link href="/profile">Surti Plataforma Online</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useAuthStore} from "@/pinia/useAuthStore";
const {logUserOut} = useAuthStore();
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
