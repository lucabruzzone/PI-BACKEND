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
        res.json(resultados);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = getCountryByName;
