import {storeToRefs} from "pinia";
import {useAuthStore} from "@/pinia/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const {setdatosUser, setAuthenticated} = useAuthStore()

    const token = useCookie('token'); // get token from cookies




    if (token.value) {

        // check if value exists
        // @ts-ignore
        setdatosUser(useCookie('nombre').value.toString(),useCookie('usuario').value.toString())
        setAuthenticated(true); // update the state to authenticated

    }



// if token exists and url is /login redirect to homepage

    if (token.value && to?.name === 'login') {

        return navigateTo('/');

    }



// if token doesn't exist redirect to log in

    if (!token.value && to?.name !== 'login') {

        abortNavigation();

        return navigateTo('/login');

    }
})
