/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{ts,jsx,tsx}'],
  theme: {

    colors: {
        ash:{
            10: "rgba(38, 38, 38, 1)",
        },
      yellow: {
          10: "rgba(254, 215, 10, 0.1)",
          20: "rgba(254, 215, 10, 0.2)",
          30: "rgba(254, 215, 10, 0.3)",
          40: "rgba(254, 215, 10, 0.4)",
          50: "rgba(254, 215, 10, 0.5)",
          60: "rgba(254, 215, 10, 0.6)",
          70: "rgba(254, 215, 10, 0.7)",
          80: "rgba(254, 215, 10, 0.8)",
          90: "rgba(254, 215, 10, 0.9)",
          100: "rgba(254, 215, 10, 1)",
      },
      white: {
          10: "rgba(255, 255, 255, 0.1)",
          20: "rgba(255, 255, 255, 0.2)",
          30: "rgba(255, 255, 255, 0.3)",
          40: "rgba(255, 255, 255, 0.4)",
          50: "rgba(255, 255, 255, 0.5)",
          60: "rgba(255, 255, 255, 0.6)",
          70: "rgba(255, 255, 255, 0.7)",
          80: "rgba(255, 255, 255, 0.8)",
          90: "rgba(255, 255, 255, 0.9)",
          100: "rgba(255, 255, 255, 1)",
      },
      gray: {
          100: "rgba(231, 231, 229, 1)",
      },
      green: {
          10: "rgba(77, 178, 93, 0.1)",
          20: "rgba(77, 178, 93, 0.2)",
          30: "rgba(77, 178, 93, 0.3)",
          40: "rgba(77, 178, 93, 0.4)",
          50: "rgba(77, 178, 93, 0.5)",
          60: "rgba(77, 178, 93, 0.6)",
          70: "rgba(77, 178, 93, 0.7)",
          80: "rgba(77, 178, 93, 0.8)",
          90: "rgba(77, 178, 93, 0.9)",
          100: "rgba(77, 178, 93, 1)",
      },
      red: {
          10: "rgba(233, 68, 68, 0.1)",
          20: "rgba(233, 68, 68, 0.2)",
          30: "rgba(233, 68, 68, 0.3)",
          40: "rgba(233, 68, 68, 0.4)",
          50: "rgba(233, 68, 68, 0.5)",
          60: "rgba(233, 68, 68, 0.6)",
          70: "rgba(233, 68, 68, 0.7)",
          80: "rgba(233, 68, 68, 0.8)",
          90: "rgba(233, 68, 68, 0.9)",
          100: "rgba(233, 68, 68, 1)",
      },
      black: {
          5: "rgba(0, 0, 0, 0.05)",
          10: "rgba(15, 13, 0, 0.1)",
          20: "rgba(15, 13, 0, 0.2)",
          30: "rgba(15, 13, 0, 0.3)",
          40: "rgba(15, 13, 0, 0.4)",
          50: "rgba(15, 13, 0, 0.5)",
          60: "rgba(15, 13, 0, 0.6)",
          70: "rgba(15, 13, 0, 0.7)",
          80: "rgba(15, 13, 0, 0.8)",
          90: "rgba(15, 13, 0, 0.9)",
          100: "rgba(15, 13, 0, 1)",
      },
      blaq: {
        0: "rgba(5, 0, 1, 1)",
        7: "rgba(5, 0, 1, 0.7)",
    },
      pink:"rgba(255, 252, 235, 1)",
      transparent: "transparent",
  },

  fontSize: {
      "6xl": ["92px", "110%"],
      "5xl": ["60px", "110%"],
      "4xl": ["48px", "110%"],
      "3xl": ["32px", "42px"],
      "2xl": ["28px", "33px"],
      xl: ["20px", "23px"],
      "2lg": ["18px", "130%"],
      lg: ["16px", "24px"],
      "3md": ["15px", "130%"],
      "2md": ["14px", "130%"],
      md: ["13px", "130%"],
      "3sm": ["12px", "14px"],
      "2sm": ["10px", "12px"],
      sm: ["11px", "100%"],
  },
  fontFamily: {
      creato: ["CreatoDisplay", "sans-serif"],
      creatoMedium: ["CreatoDisplayMedium", "sans-serif"],
      creatoBold: ["CreatoDisplayBold", "sans-serif"],
      creatoBlack: ["CreatoDisplayBlack", "sans-serif"],
      creatoLight: ["CreatoDisplayLight", "sans-serif"],
      creatoDisplayItalic: ["CreatoDisplayItalic", "sans-serif"],
  },

      extend: {
        backgroundImage: {
            "dashboard-pattern" : "url('./src/assets/Thumbnail.svg')",
        }
      },
      
   
  },
  plugins: [],
    
}
