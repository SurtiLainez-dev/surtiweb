<template>
  <div class="tp-header-category tp-category-menu tp-header-category-toggle">
    <button @click="handleActive" class="tp-category-menu-btn tp-category-menu-toggle">
      <span>
        <SvgDropdown />
      </span>
      Todas las Categorias
    </button>
    <Transition>
      <nav v-if="isActive" class="tp-category-menu-content">
        <ul>
          <li v-for="(item, i) in initialState.cats" class="has-dropdown" :key="i">
            <a class="cursor-pointer" @click="handleParentCategory(item.nombre, item.cod, item.id)">
              <span v-if="item.img">
                <img
                    :src="item.img"
                    alt="cate img"
                    style="width: 50px; height: 50px; object-fit: contain"
                />
              </span>
              {{item.nombre}}
            </a>

            <ul v-if="item.sub_familia_articulos.length > 0" class="tp-submenu">
              <li v-for="child in item.sub_familia_articulos" :key="i">
                <a class="cursor-pointer" @click="handleSubCategory(child.nombre, child.cod, child.id)">{{ child.nombre }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import category_data from "@/data/category-data";
import {useCategoriasStore} from "@/pinia/useCategoriasStore";
const router = useRouter();
let isActive = ref<boolean>(false);
const {initialState} = useCategorias;
const catStore = useCategoriasStore();
// handle active
const handleActive = () => isActive.value = !isActive.value;

// handle parent
const handleParentCategory = (value:string, cod:string, id:number) => {
  const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
  router.push(`/shop?category=${newCategory}`);
  catStore.capturarDatosCategoria(value,cod, id,'cat')
}

// handle parent
const handleSubCategory = (value:string, cod:string, id:number) => {
  const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
  router.push(`/shop?subCategory=${newCategory}`);
  catStore.capturarDatosCategoria(value,cod, id,'sub');
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
