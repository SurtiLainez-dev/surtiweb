<template>
  <div class="offcanvas__category pb-40">
    <button @click="toggleCategoryActive" class="tp-offcanvas-category-toggle">
      <i class="fa-solid fa-bars"></i>
      Todas las Categorias
    </button>
    <div class="tp-category-mobile-menu">
      <nav
        :class="`tp-category-menu-content ${isCategoryActive ? 'active' : ''}`"
      >
        <ul :class="isCategoryActive ? 'active' : ''">
          <li
            v-for="(item, i) in initialState.cats"
            :key="i"
            class="has-dropdown"
          >
            <a class="cursor-pointer">
              <span v-if="item.img">
                <img
                  :src="item.img"
                  alt="cate img"
                  style="width: 50px; height: 50px; object-fit: contain"
                />
              </span>
              <span>{{ item.nombre }}</span>
              <button
                v-if="item.sub_familia_articulos.length > 0"
                @click="handleOpenSubMenu(item.nombre)"
                class="dropdown-toggle-btn"
              >
                <i class="fa-regular fa-angle-right"></i>
              </button>
            </a>

            <ul
              v-if="item.sub_familia_articulos.length > 0"
              :class="`tp-submenu ${openCategory === item.nombre ? 'active' : ''}`"
            >
              <li v-for="(child, i) in item.sub_familia_articulos" :key="i">
                <a class="cursor-pointer">{{ child.nombre }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCategoriasStore} from "@/pinia/useCategoriasStore";

const {initialState} = useCategorias;
const catStore = useCategoriasStore();
import category_data from "@/data/category-data";
const props = defineProps<{ productType: string }>();
let isCategoryActive = ref<boolean>(false);

const filterCategories = computed(() => {
  return category_data.filter(
    (c) => c.productType.toLowerCase() === props.productType.toLowerCase()
  );
});

let openCategory = ref<string>("");

const handleOpenSubMenu = (title: string) => {
  if (title === openCategory.value) {
    openCategory.value = "";
  } else {
    openCategory.value = title;
  }
};

const toggleCategoryActive = () => {
  isCategoryActive.value = !isCategoryActive.value;
};
</script>

