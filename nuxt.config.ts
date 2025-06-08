// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-directus',
    ],
    runtimeConfig: {
        public: {
            directus: {
                url: "https://data.arendz.nl",
                autoRefresh: true,
            },
        }
    },
    routeRules: {
        '/scan': {ssr: false},
    },
    app: {
        head: {
            title: 'BikePark',
            titleTemplate: '%s - BikePark',
            link: [
                {rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96'},
                {rel: 'icon', type: 'image/svg', href: '/favicon.svg'},
                {rel: 'shortcut icon', href: '/favicon.ico'},
                {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
                {rel: 'manifest', href: '/site.webmanifest'},
            ],
            meta: [
                {name: 'apple-mobile-web-app-title', content: 'BikePark'}
            ]
        }
    }
})
