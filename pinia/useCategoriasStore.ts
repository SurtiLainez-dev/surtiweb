import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import {dataTop20} from "@/types/interfaces/CategoriaInterface";
export const useCategoriasStore = defineStore("categoria",
    () => {
        const catStore = useCategoriasStore()
        const axios = useNuxtApp().$axios;
        let tituloCategoria = ref<string>('');
        let codigoCategoria = ref<string>('');
        let idCategoria     = ref<number>(0);
        let isCategoria     = ref<string>('cat');
        let articulos       = ref<dataTop20[]>([]);
        let loadPage        = ref<boolean>(false);

        const capturarDatosCategoria = (titulo: string, codigo: string, id: number, tipo:string) => {
            tituloCategoria.value = titulo;
            codigoCategoria.value = codigo;
            idCategoria.value     = id;
            isCategoria.value     = tipo;
        }

        const anadirArticulos = (data: dataTop20[])=>{
            articulos.value = data;
        }

        const cargarDatos = () =>{
            loadPage.value = true;
            console.log(idCategoria.value)
            if (isCategoria.value === 'cat'){
                axios.get('articulos_x_familia/'+idCategoria.value).then((res)=>{
                    loadPage.value = false;
                    catStore.anadirArticulos(res.data.articulos);
                });
            }else{
                console.log("entro")
                axios.get('articulos_x_sub_familia/'+idCategoria.value).then((res)=>{
                    loadPage.value = false;
                    catStore.anadirArticulos(res.data.articulos);
                });
            }
        }

        return {
            tituloCategoria,
            codigoCategoria,
            capturarDatosCategoria,
            idCategoria,
            isCategoria,
            anadirArticulos,
            articulos,
            cargarDatos,
            loadPage
        }
    })
