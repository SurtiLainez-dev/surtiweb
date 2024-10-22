<template>
    <div class="tp-shop-top-select text-md-end">
      <ui-nice-select
        :options="[
          { value: 'default-sorting', text: 'Destacado' },
          { value: 'low-to-high', text: 'Precio Menor a Mayor' },
          { value: 'high-to-low', text: 'Precio Mayor a Menor' },
          { value: 'on-sale', text: 'Descuento' },
        ]"
        name="Select Category"
        :default-current="0"
        @onChange="handleSelect"
      />
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['handleSelectFilter'])
const handleSelect = (e: { value: string; text: string }) => {
  emit('handleSelectFilter', e);
};
</script>
