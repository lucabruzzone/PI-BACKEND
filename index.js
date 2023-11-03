require("dotenv").config();
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const { Country } = require('./src/db');
const API_PORT = process.env.API_PORT || 3001;


conn.sync({ alter: true }).then(() => {
  // llamamos a esta función solo en etapa de desarrollo para preparar nuestra la base de datos de esta app
  /* getAllCountries(); */
  server.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}`);
  })
}).catch(error => console.error(error))



// función para setear la base de datos por primera vez con todos los países de la api externa
async function getAllCountries() {
  try {
    const { data } = await axios.get('http://localhost:5000/countries');
    const allCountriesArray = data.map(country => {
      return {
        ID: country.fifa || country.cca3,
        nombre: country.name.common,
        imagenBandera: country.flags.png,
        continente: country.region,
        capital: country.capital || '',
        subRegion: country.subregion || '',
        area: country.area,
        poblacion: country.population,
      }
    });
    await Country.bulkCreate(allCountriesArray);
    console.log('Países guardados en la base de datos');
  }
  catch (error) {
    console.error('Error al obtener o guardar los países:', error);
  }
}
