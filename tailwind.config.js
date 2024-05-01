/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto-condensed": ["Roboto Condensed", "sans-serif"]
      },
      colors: {
        "primary-color": "#00278B"
      },
      width: {
        "28por": "28%",
        "72por": "72%"
      },
      backgroundImage: {
        "bg-logo": "url(./assets/logo2.svg)"
      },
      backgroundSize: {
        "25por": "25%"
      },
    },
  },
  plugins: [],
}

