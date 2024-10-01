const { getAllActivities } = require('../models');

const httpGetAllActivities = (_, res) => 
  res.status(200).json(getAllActivities());

module.exports = {
  httpGetAllActivities,
}