/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,jsx,tsx}'],
  theme: {
      colors: {
        primary: {
          1: "#000000",
          10: "#262626",
          20: "rgba(15, 13, 0, 0.6)",
          30: "rgba(15, 13, 0, 0.7)",
          40: "rgba(15, 13, 0, 0.1)",
          50: "#EDEDED",
          60: "#5c5c5c"
        },
        yellow: {
          1: "rgba(254, 215, 10, 0.2)",
          10: "#FED70A",
          20: "rgba(254, 215, 10, 0.1)"
        },
        white: {
          1: "#F5F5F5",
          10: "#FFFDF5",
          20: "rgba(233, 68, 68, 0.1)",
          30: "#FFFFFF",
          40: "#EDEDED",
          50: "#E94444",
          60: "#F7F7F7",
          70: "rgba(255, 255, 255, 0.1)"
        },
        green: {
          1: "#4DB25D",
          10: "rgba(77, 178, 93, 0.1)"
        }
      },
      extend: {
        backgroundImage: {
          'dashboard-pattern': "url('/src/dashboard/assets/Thumbnail.svg')",
        }
      },
  },
  plugins: [],
}
