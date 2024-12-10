import { defineStore } from "pinia";
import {toast} from "vue3-toastify";
import {ref} from "vue"

interface UserPayloadInterface {
    username: string;
    password: string;
}

const url = 'https://grupolainez.com/api/tilk/user/'
export const useAuthStore = defineStore('user_store', () =>{



})
