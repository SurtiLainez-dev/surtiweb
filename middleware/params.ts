export default defineNuxtRouteMiddleware((to)=>{
    console.log('esta es mi parametro : '+to.params.id)
})
