const { getAllActivities } = require('@models/activitiy.model');

const httpGetAllActivities = (_, res) => 
  res.status(200).json(getAllActivities());

module.exports = {
  httpGetAllActivities,
}