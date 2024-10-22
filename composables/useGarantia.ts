import { reactive, ref} from 'vue';
import {artConsultaInterface} from "../pages/surti/garantia/nueva.vue";

interface dataGarantia {
    Articulos: artConsultaInterface[] | null
}
export const useArticulosGarantia = () =>{
    let initialState = reactive<dataGarantia>({
        Articulos: null
    });

    const addArticuloConsultaCuentaGarantia = (data:artConsultaInterface[])=>{
        initialState.Articulos = data;
    }

    return{
        initialState,
        addArticuloConsultaCuentaGarantia
    }
}

export default useArticulosGarantia();
