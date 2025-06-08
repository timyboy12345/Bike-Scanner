module.exports = {
    content: ['pages/**/*.vue', 'app.vue', 'layouts/**/*.vue'],
    darkMode: 'media',
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
