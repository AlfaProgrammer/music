module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] }, // le classi non utilizzate non verranno caricate
  darkMode: false, // per attivare le classi darkmode
  theme: {
    extend: {}, // per usare variabili personalizzate per il tema
  },
  variants: {
    extend: {}, // questo serve per dare dello stile in base a certe condizioni
    // (ES: colore diverso quando mouse in hover)
  },
  plugins: [],

};
