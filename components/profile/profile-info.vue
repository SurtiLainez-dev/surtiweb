<template>
  <div class="profile__info">
      <h3 class="profile__info-title">Datos Personales</h3>
      <div class="profile__info-content">
        <!-- form start -->
        <forms-update-profile-form v-if="loadData"/>
        <span v-else>cargando ...</span>
        <!-- form end -->
      </div>
  </div>
</template>

<script setup lang="ts">
import {useClienteStore} from "@/pinia/useClienteStore";
import {storeToRefs} from "pinia";
const {loadData} = storeToRefs(useClienteStore())
</script>
