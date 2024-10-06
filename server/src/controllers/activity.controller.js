const { 
  selectAllActivities,
  findActivity,
  insertActivity,
  validateActivity
} = require('@models/activitiy.model');
const { getPagination } = require('@services/query');

const getAllActivities = async(req, res) => {
  const { skip, limit } = getPagination(req.query);
  const activities = await selectAllActivities(skip, limit);
  res.status(200).json(activities);
}

const getActivity = async(req, res) => {
  const activityId = Number(req.params.id);
  const activity = await findActivity(activityId);

  if (!activity)
    return res.status(404).json({ error: 'Activity was not found.'});

  return res.status(200).json(activity);
}

const postNewActivity = async(req, res) => {
  const activity = req.body;

  const error = await validateActivity(activity);
  if (error)
    return res.status(400).json({ error });
  
  await insertActivity(activity);
  return res.status(201).json(activity);
}

module.exports = {
  getAllActivities,
  getActivity,
  postNewActivity,
}