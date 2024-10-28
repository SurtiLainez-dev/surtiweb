import { defineStore } from "pinia";
import {toast} from "vue3-toastify";
import {ref} from "vue"

interface UserPayloadInterface {
    username: string;
    password: string;
}

const url = 'https://grupolainez.com/api/tilk/user/'
export const useAuthStore = defineStore('user_auth', () =>{
    const authenticated = ref<boolean>(false);
    const loading       = ref<boolean>(false);
    const usuario       = ref<string>('');
    const nombre        = ref<string>('');

    const setAuthenticated = (val:boolean) =>{
        authenticated.value = val;
    }

    const setLoading = () =>{
        return loading.value = !loading.value;
    }
    const authenticateUser = async ({ username, password }: UserPayloadInterface) =>{
        setLoading()
        const { data, pending }: any = await useFetch(url+'login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
                username,
                password,
            },
        });

        if (data.value) {
            const token   = useCookie('token');
            const nombre  = useCookie('nombre');
            const usuario = useCookie('usuario');
            token.value   = data.value.success.token;
            nombre.value  = data.value.usuario;
            usuario.value = data.value.nombre;
            authenticated.value = true;
            setLoading();

            toast.success('Registro de sesión correctamente')
            navigateTo('/profile');
        }else{
            toast.success('Registro de sesión correctamente')
        }
    }
    const logUserOut = async () =>{
        setLoading();
        const { data, pending }: any = await useFetch(url+'logout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+useCookie('token').value
            },
        });
        setLoading();
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        authenticated.value = false; // set authenticated  state value to false
        token.value = null; // clear the token cookie
        navigateTo('/');
    }
    const setdatosUser = (nombreUser:string, Usuario:string)=>{
        usuario.value = Usuario;
        nombre.value  = nombreUser;
    }

    return{
        authenticated,
        loading,
        usuario,
        nombre,
        authenticateUser,
        logUserOut,
        setdatosUser,
        setAuthenticated,
        setLoading
    }
})
