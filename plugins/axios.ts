import axios from "axios";

export default defineNuxtPlugin(async () =>{
    const url = 'http://localhost:8000/api/tilk/';

    let api = axios.create({
        baseURL: url
    })

    return{
        provide: {
            axios: api,
        }
    }
})


