module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Esto activa explícitamente estas clases
    backfaceVisibility: true,
    transformStyle: true,
    perspective: true,
  },
}
