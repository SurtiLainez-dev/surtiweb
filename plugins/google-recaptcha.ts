import { VueReCaptcha } from 'vue-recaptcha-v3';
export default defineNuxtPlugin((nuxtApp) => {
    // @ts-ignore
    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: '6LfcqV8qAAAAAPnbyRWh1qR-MYmOeNc7U_3QR0rq',
    });
});
