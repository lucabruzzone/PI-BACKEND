const { Country } = require('../../db');
const { Op } = require('sequelize');

// función para obtener un país según su nombre
async function getCountryByName(req, res) {
    try {
        // extraemos el nombre pasado por query
        let { name } = req.query;
        if (!name) throw Error('Faltan datos');
        const resultados = await Country.findAll({
            // usamos el operador 'iLike' de Sequelize para que la base de datos sea insensible a minúsculas o mayúsculas
            //esto se hace para que el usuario no se preocupe si escribe con mayúsculas o minúsculas
            where: {
                nombre: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });
        if (!resultados.length) throw Error("país no encontrado");
        let countriesWithActivities = [];
        for (const country of resultados) {
            const activities = await country.getActivities();
            const countryInfo = {
                country,
                activities,
            };
            countriesWithActivities.push(countryInfo);
        }
        const countries = countriesWithActivities.map(country => {
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
        res.json(countries);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = getCountryByName;
