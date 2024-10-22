<template>
  <section class="tp-product-category pt-60 pb-15">
    <div class="container">
      <div class="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
        <div v-for="(item, i) in initialState.top" :key="i" class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer"
                 style="
                 background-image: radial-gradient(95.56% 95.56% at 50% 50%, #FFFFFF 0%, #a5a5a5 100%);
                 background-color: orangered !important;"
                 @click="handleParentCategory(item.sub_familia_articulo.nombre, item.sub_familia_articulo.codigo,item.sub_familia_articulo.id)">
                <img :src="item.sub_familia_articulo.img" alt="product-category" height="100" width="76"/>
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click="handleParentCategory(item.parent)">
                  {{ item.sub_familia_articulo.nombre}}
                </a>
              </h3>
<!--              <p>{{ item.products.length }} Product</p>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useCategoriasStore} from "@/pinia/useCategoriasStore";

const {initialState} = useCategorias;
const catStore = useCategoriasStore();

const router = useRouter();
// handle parent
const handleParentCategory = (value:string, cod:string, id:number) => {
  const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
  router.push(`/tienda?subCategory=${newCategory}`);
  catStore.capturarDatosCategoria(value,cod, id,'sub');
  catStore.cargarDatos()

}
</script>
