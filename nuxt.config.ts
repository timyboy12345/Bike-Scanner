// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-directus'],
    runtimeConfig: {
        public: {
            directus: {
                url: "https://data.arendz.nl"
            }
        }
    },
    routeRules: {
        '/scan': { ssr: false },
    }
})
