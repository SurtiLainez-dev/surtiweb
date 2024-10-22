import { reactive, ref} from 'vue';
import {
    articuloInterface,
    dataBanner,
    dataCategories,
    dataTop20, detalleArticulosInterface, fotosArticulosInterface,
    sub_familia_articulos
} from "@/types/interfaces/CategoriaInterface";

interface Cats{
    cats: null | dataCategories[],
    top: null | sub_familia_articulos[],
    banners: null | dataBanner[],
    top20: null | dataTop20[],
    articulo: null | articuloInterface,
    fotos: null | fotosArticulosInterface[],
    stock: Number,
    detalles: null | detalleArticulosInterface[],
    articulosSimilares: null | dataTop20[]
}
export const useCategorias = () =>{
    let initialState = reactive<Cats>({
        cats: null,
        top: null,
        banners: null,
        top20: null,
        articulo: null,
        fotos: null,
        stock: 0,
        detalles: null,
        articulosSimilares: null
    });
    const addArticulo = (
        dataArticulo: articuloInterface,
        dataFotos: fotosArticulosInterface[],
        stock: Number,
        dataDetalles: detalleArticulosInterface[]
    ) => {
        initialState.articulo = dataArticulo;
        initialState.fotos    = dataFotos;
        initialState.stock    = stock;
        initialState.detalles = dataDetalles
    }
    const addCategorias = (data:dataCategories[]) =>{
        initialState.cats = data;
    }
    const addTop = (data:sub_familia_articulos[]) =>{
        initialState.top = data;
    }

    const addBanners = (data:dataBanner[]) =>{
        initialState.banners = data;
    }
    const addTop20 = (data:dataTop20[])=>{
        initialState.top20 = data;
    }
    const asignarArticulosSimilares = (data:dataTop20[])=>{
        initialState.articulosSimilares = data;
    }
    return{
        initialState,
        addCategorias,
        addTop,
        addBanners,
        addTop20,
        addArticulo,
        asignarArticulosSimilares
    }
}
export default useCategorias();
