require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

/* const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  dialectModule: require('pg'),
  logging: false, 
  native: false, 
}); */
const sequelize = new Sequelize(`postgres://${DB_USER}:admin@localhost/countries`, {
  dialectModule: require('pg'),
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Country.belongsToMany(Activity, {through: 'country_activity'});
Activity.belongsToMany(Country, {through: 'country_activity'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

// lo de abajo es la conexión de la base de datos Postgres "countries" en el localhost:

/* DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=localhost
DB_NAME=countries
API_KEY=1234
`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}` */



// script de desarrollo para levantar nuestra api y la api externa:

/* "scripts": {
  "server": "nodemon index.js",
  "api": "echo 'Local API listening on PORT 5000' & json-server --watch api/db.json -p 5000 -q",
  "start": "concurrently \"npm run server\" \"npm run api\""
}, */