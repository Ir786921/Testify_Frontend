/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  prefix: 'tw-',
  theme: {
   
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 12s linear infinite',
        'infinite-scroll-right' : 'infinite-scroll-right 12s linear infinite',
        'infinite-scroll-left' : 'infinite-scroll-left 12s linear infinite'
      },
      keyframes: {
        'infinite-scroll': {
          
          to : { left: '-200px' },
        },
        'infinite-scroll-right': {
        '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'infinite-scroll-left': {
         '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      scrollBehavior: ['smooth'],
    },
  },
  corePlugins: {
    preflight: false,

},
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}