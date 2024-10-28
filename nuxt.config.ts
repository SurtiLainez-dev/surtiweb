// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vee-validate/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
  app: {
    head: {
      title: "Surtidora Lainez - Electrodomesticos, Muebles y Motocicletas",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js",
        },
      ],
    }
  },
  ssr: true,
  target: "server",
  nitro: {
    prerender: {
      routes:['/surti/otras_gestiones/estado_placa'],
      crawlLinks: true,
      failOnError: false,
    },
  },
  css: [
    "bootstrap/scss/bootstrap.scss",
    "swiper/css/bundle",
    "@/assets/css/font-awesome-pro.css",
    "@/assets/css/flaticon_shofy.css",
    "@/assets/scss/main.scss",
  ],
  axios:{

  }
})
