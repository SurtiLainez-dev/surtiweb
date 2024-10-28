import {defineStore} from "pinia";
import {ClienteInterfaz, resMisDatos} from "@/types/lainez/clienteInterfaces";

// export const useClienteStore = defineStore("cliente_store", () => {
//     let cliente = ref<ClienteInterfaz | null>(null);
//     let cantCuentas = ref<number>(0);
//     let cantSolicitudes = ref<number>(0);
//     let cantRecibos = ref<number>(0);
//
//     const setDatosCliente = (data:resMisDatos) =>{
//         cliente.value         = data.cliente;
//         cantCuentas.value     = data.cantCuentas;
//         cantSolicitudes.value = data.cantSolicitudes;
//         cantRecibos.value     = data.cantRecibos;
//         console.log('entra')
//     }
//
//     return {
//         cliente,
//         cantCuentas,
//         cantSolicitudes,
//         cantRecibos,
//         setDatosCliente
//     };
// });

export const useClienteStore = defineStore('cliente_store', {
    state: () => ({
        cliente: null,
        cantCuentas: 0,
        cantRecibos: 0,
        cantSolicitudes: 0,
        loadData: false
    }),
    actions: {
        setDatosCliente (data:resMisDatos){
            // @ts-ignore
            this.cliente         = data.cliente;
            this.cantCuentas     = data.cantCuentas;
            this.cantSolicitudes = data.cantSolicitudes;
            this.cantRecibos     = data.cantRecibos;
            this.loadData        = true
        }
    },
});
