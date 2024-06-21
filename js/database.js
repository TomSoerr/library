const { Sequelize, DataTypes, Op } = require('sequelize');
const path = require('path');
const { app } = require('electron');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(app.getPath('userData'), 'library.sqlite'),
});

// Define a model
const Library = sequelize.define('Library', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bewertung: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gelesen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  beendet_am: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ist_reihe: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  band: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  favorit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  anmerkung: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  leseexemplar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  verliehen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  verliehen_an: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verlag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

async function syncDatabase() {
  await sequelize.sync();
}

module.exports = { Library, syncDatabase, Op };
