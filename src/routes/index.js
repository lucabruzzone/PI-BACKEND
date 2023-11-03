const { Router } = require("express");
const getAllCountries = require('../controllers/countries/getAllCountries');
const getCountryByName = require('../controllers/countries/getCountryByName');
const getCountryById = require('../controllers/countries/getCountryById');
const getAllActivities = require('../controllers/activities/getAllActivities');
const newActivity = require('../controllers/activities/newActivity');
const deleteActivity = require('../controllers/activities/deleteActivity');
const getActivityByCountry = require('../controllers/activities/getActivityByCountry');
const apiKeyMiddleware = require('../utils/apiKeyMiddleware');

const router = Router();

// rutas para los países:
router.get('/countries', getAllCountries);
router.get('/country', getCountryByName);
router.get('/country/:id', getCountryById);

// rutas para las actividades:
router.get('/activities', getAllActivities);
router.get('/activities/:id', getActivityByCountry);
router.post('/activities', newActivity);
router.delete('/activities/:id', deleteActivity);

module.exports = router;


// apiKey usable en caso de necesitarlo
/* apiKeyMiddleware */