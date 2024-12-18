import axios from "axios";

export default defineNuxtPlugin(async () =>{
    const url = 'https://grupolainez.com/api/tilk/';

    let api = axios.create({
        baseURL: url
    })

    return{
        provide: {
            axios: api,
        }
    }
})


