<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="category in categoriasFiltradas" :key="category.id">
          <a
            @click.prevent="handleCategoryRoute(category.nombre, '', category.id)"
            :class="`cursor-pointer ${
              activeQuery ===
              category.nombre
                .toLowerCase()
                .replace('&', '')
                .split(' ')
                .join('-')
                ? 'active'
                : ''
            }`"
          >
            {{category.fam}} - {{ category.nombre }}
            <span>{{ category.cant }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import {useCategoriasStore} from "@/pinia/useCategoriasStore";
const {initialState} = useCategorias;
const router = useRouter();
const route = useRoute();
const activeQuery = ref<string>("");
interface dataCategorias{
  nombre: String,
  cant: Number,
  id: Number,
  fam: String
}
const categoriasFiltradas = ref<dataCategorias[] | []>([])
const props = defineProps<{
  filter_dropdown?: boolean;
  filter_offcanvas?: boolean;
  load_more?: boolean;
  right_side?: boolean;
  shop_full?: boolean;
  shop_1600?: boolean;
}>();

const capturarCategorias = () =>{
  categoriasFiltradas.value       = [];
  let categorias:dataCategorias[] = [];
  initialState.cats.forEach((item)=>{
    item.sub_familia_articulos.forEach((index:dataCategorias)=>{
      categorias.push({
        fam: item.nombre,
        id: index.id,
        cant: index.cant,
        nombre: index.nombre
      })
    })
  });
  categoriasFiltradas.value = categorias;
}
const catStore = useCategoriasStore();
// handle category route
const handleCategoryRoute = (value: string, codigo: string, id:number) => {
  const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
  if (props.filter_dropdown) {
    router.push(`/shop-filter-dropdown?category=${newCategory}`);
  } else if (props.filter_offcanvas) {
    router.push(`/shop-filter-offcanvas?category=${newCategory}`);
  } else if (props.load_more) {
    router.push(`/shop-load-more?category=${newCategory}`);
  } else if (props.right_side) {
    router.push(`/shop-right-sidebar?category=${newCategory}`);
  } else if (props.shop_full) {
    router.push(`/shop-full-width?category=${newCategory}`);
  } else if (props.shop_1600) {
    router.push(`/shop-1600?category=${newCategory}`);
  } else {
    router.push(`/tienda?subCategory=${newCategory}`);
    catStore.capturarDatosCategoria(value,codigo, id,'sub');
    catStore.cargarDatos()
  }
};
watch(
  () => route.query,
  (newStatus) => {
    activeQuery.value = newStatus.category;
  }
);
onMounted(() => {
  activeQuery.value = route.query.category;
  capturarCategorias();
  console.log(activeQuery.value)
});
</script>
