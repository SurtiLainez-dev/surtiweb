import {defineStore} from "pinia";
import {ClienteInterfaz, resMisDatos, TelefonoInterfaz} from "@/types/lainez/clienteInterfaces";
const axios = useNuxtApp().$axios;
export const useClienteStore = defineStore('cliente_store', {
    state: () => ({
        cliente: null,
        cantCuentas: 0,
        cantRecibos: 0,
        cantSolicitudes: 0,
        loadData: false,
        Cuentas: [],
        Telefonos: [],
        Garantias: [],
        Finiquitos: [],
        Permisos: []
    }),
    actions: {
        setDatosCliente (data:resMisDatos){
            // @ts-ignore
            this.cliente         = data.cliente;
            this.cantCuentas     = data.cantCuentas;
            this.cantSolicitudes = data.cantSolicitudes;
            this.cantRecibos     = data.cantRecibos;
            this.loadData        = true;
            // @ts-ignore
            this.Telefonos       = data.telefonos;
            // @ts-ignore
            this.Cuentas         = data.cuentas;
            // @ts-ignore
            this.Garantias       = data.garantias;
            this.Finiquitos      = data.finiquitos;
            // @ts-ignore
            this.Permisos        = data.permisos;
        },
        addTelefono(data:TelefonoInterfaz){
            this.Telefonos.push({
                // @ts-ignore
                key: this.Telefonos.length,
                // @ts-ignore
                num: data.num,
                // @ts-ignore
                area: data.area,
                // @ts-ignore
                detalle: data.detalle
            })
        }
    },
});
