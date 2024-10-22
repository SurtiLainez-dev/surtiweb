import axios from "axios";

export default defineNuxtPlugin(async () =>{
    const url = 'http://143.198.112.228/api/tilk/';
    let api = axios.create({
        baseURL: url
    })
    return{
        provide: {
            axios: api
        }
    }
})
