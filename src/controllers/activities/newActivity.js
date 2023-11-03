const { Country, Activity } = require('../../db');

// función para obtener la lista completa de actividades
async function newActivity(req, res) {
    try {
        const { nombre, dificultad, duracion, temporada, paises } = req.body;
        if(!nombre || !dificultad || !duracion || !temporada || !paises.length) throw Error('Faltan datos');
        const temporadaLowerCase = temporada.toLowerCase();
        const nombreLowerCase = nombre.toLowerCase();
        const newAct = await Activity.create({
            nombre: nombreLowerCase,
            dificultad,
            duracion,
            temporada: temporadaLowerCase
        });
        const paisesRelacionados = await Country.findAll({ where: { nombre: paises } });
        await newAct.setCountries(paisesRelacionados);
        res.status(201).json(newAct);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = newActivity;
