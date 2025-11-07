// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    // This REPLACES the default font families
    fontFamily: {
      // Sets the default "sans-serif" font to Instrument Serif
      sans: ['"Instrument Serif"', 'sans-serif'], 
      // Sets the "serif" font utility class to Instrument Serif
      serif: ['"Instrument Serif"', 'serif'],
    },
    // Keep extend empty for now unless you have other customizations
    extend: {},
  },
  plugins: [],
}