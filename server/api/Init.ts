interface dataInit{
    menu: dataCategories | []
}
interface dataCategories{
    nombre: String,
    id: Number,
    sub_familia_articulos: sub_familia_articulos[]
}
interface sub_familia_articulos{
    nombre: String,
    id: Number
}
import { readonly, ref } from 'vue';
export const LoadDataInit = () =>{

    const load = () =>{
        const axios = useNuxtApp().$axios;
        const categorias = ref<dataCategories | []>([]);
        axios.get<dataInit>('data_init').then((res)=>{

        })
    }
}
