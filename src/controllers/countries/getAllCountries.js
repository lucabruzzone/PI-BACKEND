const { Country } = require('../../db')

// función para obtener la lista completa de países
async function getAllCountries(req, res) {
    try {
        const data = await Country.findAll();
        // hacemos un map para extraer la capital de cada país y limpiar el string que contiene símbolos indeseados
        if (!data) {
            throw Error('No se encontraron países');
        }
        else {
            let countriesWithActivities = [];
            for (const country of data) {
                const activities = await country.getActivities();
                const countryInfo = {
                    country,
                    activities,
                };
                countriesWithActivities.push(countryInfo);
            }
            const allCountries = countriesWithActivities.map(country => {
                let _country = country.country;
                let _activities = country.activities;
                let capital = _country.capital;
                capital = capital.replace(/[{}, "]/g, '');
                capital = capital.replace(/\\/g, '');
                return {
                    ID: _country.ID,
                    nombre: _country.nombre,
                    imagenBandera: _country.imagenBandera,
                    continente: _country.continente,
                    capital: capital,
                    subRegion: _country.subRegion,
                    area: _country.area,
                    poblacion: _country.poblacion,
                    activities: _activities
                }
            });
            res.json(allCountries);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = getAllCountries;
