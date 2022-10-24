/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,jsx,tsx}'],
  theme: {
      extend: {
        colors: {
          'blaq': '#050001',
          'light-black': 'rgba(5, 0, 1, 0.7)',
          'state-green': '#4DB25D',
          'form-black': '#0F0D00',
          'placeholder-white': '#E7E7E5',
          'orange': '#FED70A', 
          'fg-black': 'rgba(15, 13, 0, 0.9)',
          'grey': 'rgba(255, 255, 255, 0.2)',
          'arr': 'rgba(15, 13, 0, 0.1)',
          'light-green': 'rgba(77, 178, 93, 0.9)',
          'blac': 'rgba(19, 32, 19, 0.8)',
          'pas': 'rgba(15, 13, 0, 0.6)',
          'tex': 'rgba(15, 13, 0, 0.7)',
          'con': 'rgba(15, 13, 0, 0.02)',
          'neutral-black': '#132013',
        },
        borderRadius: {
          'md': '8px',
          'lg': '10px',
          '3lg': '30px',
          'haf': '50%',
        },
        lineHeight: {
          'extra-loose': '58px',
          'loose': '26px'
        },
        width: {
          '128': '414px',
        },
        fontSize: {
          'smm': '13px'
        }
      },
  },
  plugins: [],
}
