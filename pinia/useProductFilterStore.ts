import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

import {useCategoriasStore} from "@/pinia/useCategoriasStore";
export const useProductFilterStore = defineStore("product_filter", () => {
  const route = useRoute();
  const router = useRouter();
  let selectVal = ref<string>("");
  const catStore = useCategoriasStore();

  const handleSelectFilter = (e: { value: string; text: string }) => {
    selectVal.value = e.value;
  }

  const maxProductPrice = computed(()=>{
    if (catStore.articulos.length > 0){
      let precio = catStore.articulos.reduce((max, product) => {
        return product.precio_contado > max ? product.precio_contado : max;
      }, 0);
      return Math.trunc(precio);
    }else{
      return 0;
    }
  })


  let priceValues = ref<[number, number]>([0, maxProductPrice.value]);

  const handlePriceChange = (value: number[]) => {
    priceValues.value = value;
  };

  const handleResetFilter = () => {
    priceValues.value = [0, maxProductPrice.value];
  };

  // filteredProducts
  const filteredProducts = computed(() => {
    if (route.query.minPrice && route.query.maxPrice) {
      return catStore.articulos.filter(
        (p) =>
          p.precio_contado >= Number(route.query.minPrice) &&
          p.precio_contado <= Number(route.query.maxPrice)
      );
    } else if (route.query.status) {
      if (route.query.status === "on-sale") {
        return catStore.articulos.filter((p) => p.precio_contado > 0);//analozar descuetno
      } else if (route.query.status === "in-stock") {
        return catStore.articulos.filter((p) => p.stock > 0);
      }
    } else if (route.query.category) {
      return catStore.articulos.filter(
        (p) =>
          p.familia.toLowerCase().replace("&", "").split(" ").join("-") ===
          route.query.category
      );
    } else if (route.query.subCategory) {
      return catStore.articulos.filter(
        (p) =>
          p.cat.toLowerCase().replace("&", "").split(" ").join("-") ===
          route.query.subCategory
      );
    } else if (route.query.brand) {
      return catStore.articulos.filter(
        (p) =>
          p.marca.toLowerCase().replace("&", "").split(" ").join("-") ===
          route.query.brand
      );
    } else if (selectVal.value) {
      console.log("adento del filtro")
      if (selectVal.value === "default-sorting") {
        return catStore.articulos;
      } else if (selectVal.value === "low-to-hight") {
        return catStore.articulos
          .slice()
          .sort((a, b) => Number(a.precio_contado) - Number(b.precio_contado));
      } else if (selectVal.value === "high-to-low") {
        return catStore.articulos
          .slice()
          .sort((a, b) => Number(b.precio_contado) - Number(a.precio_contado));
      } else if (selectVal.value === "new-added") {
        return catStore.articulos.slice(-8);
      } else if (selectVal.value === "on-sale") {
        return catStore.articulos.filter((p) => p.precio_online < p.precio_contado);///ver tamin
      } else {
        return catStore.articulos;
      }
    } else {
      return catStore.articulos;
    }
  });

  // filteredProducts
  const searchFilteredItems = computed(() => {
    let filteredProducts = [...catStore.articulos];

    if (route.query.searchText && !route.query.productType) {
      filteredProducts = filteredProducts.filter((prd) =>
        prd.nombre_articulo.toLowerCase().includes(route.query.searchText.toLowerCase())
      );
    }
    if (!route.query.searchText && route.query.productType) {
      filteredProducts = filteredProducts.filter(
        (prd) => prd.familia.toLowerCase() === route.query.productType.toLowerCase()
      );
    }
    if (route.query.searchText && route.query.productType) {
      filteredProducts = filteredProducts.filter(
        (prd) => prd.familia.toLowerCase() === route.query.productType.toLowerCase()
      ).filter(p => p.nombre_articulo.toLowerCase().includes(route.query.searchText.toLowerCase()));
    }
    switch (selectVal.value) {
      case "default-sorting":
        break;
      case "low-to-high":
        filteredProducts = filteredProducts.slice().sort((a, b) => Number(a.precio_contado) - Number(b.precio_contado));
        break;
      case "high-to-low":
        filteredProducts = filteredProducts.slice().sort((a, b) => Number(b.precio_contado) - Number(a.precio_contado));
        break;
      case "new-added":
        filteredProducts = filteredProducts.slice(-6);
        break;
      case "on-sale":
        filteredProducts = filteredProducts.filter((p) => p.precio_contado > 0); ///ver
        break;
      default:
    }
    return filteredProducts;
  });


  watch(
    () => route.query || route.path,
    () => {}
  );
  return {
    maxProductPrice,
    priceValues,
    handleSelectFilter,
    filteredProducts,
    handlePriceChange,
    handleResetFilter,
    selectVal,
    searchFilteredItems,
  };
});
