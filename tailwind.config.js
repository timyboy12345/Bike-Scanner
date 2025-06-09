module.exports = {
    content: ['pages/**/*.vue', 'app.vue', 'layouts/**/*.vue'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                'primary': {
                    '50': '#fffbeb',
                    '100': '#fff5c6',
                    '200': '#ffe988',
                    '300': '#ffd74a',
                    // 400 ORIGINAL
                    '400': '#ffc72c',
                    '500': '#f9a207',
                    '600': '#dd7a02',
                    '700': '#b75506',
                    '800': '#94410c',
                    '900': '#7a350d',
                    '950': '#461b02',
                },
                'secondary': {
                    '50': '#e9f9ff',
                    '100': '#cef0ff',
                    '200': '#a7e7ff',
                    '300': '#6bdbff',
                    '400': '#26c3ff',
                    '500': '#009bff',
                    '600': '#0071ff',
                    '700': '#0056ff',
                    '800': '#0049e6',
                    '900': '#0044b3',
                    // 950 ORIGINAL
                    '950': '#002d72',
                },
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
