/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    fontFamily: {
      body: ['ui-sans-serif', 'system-ui']
    },
    fontSize: {
      base: '1rem'
    },
    extend: {
      colors: {
        red: ' hsl(0, 100%, 50%)'
      }
    }
  },
  plugins: []
}
