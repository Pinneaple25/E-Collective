const { 
  selectAllActivities,
  findActivity,
  insertActivity,
  updateActivity,
  deactivateActivity,
  validateActivity,
  anyActivity,
} = require('@models/activitiy.model');
const { getPagination } = require('@services/query');

const getAllActivities = async(req, res) => {
  const { skip, limit } = getPagination(req.query);
  const activities = await selectAllActivities(skip, limit);
  res.status(200).json(activities);
}

const getActivity = async(req, res) => {
  const activityNumber = Number(req.params.id);
  const activity = await findActivity(activityNumber);

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

const putActivity = async(req, res) => {
  const activityNumber = Number(req.params.id);
  const activity = req.body;

  if (!await anyActivity(activityNumber))
    return res.status(404).json({ error: 'Activity was not found.' });

  const error = await validateActivity(activity, activityNumber);
  if (error)
    return res.status(400).json({ error });

  await updateActivity(activityNumber, activity);
  return res.status(200).json(activity);
}

const deleteActivity = async(req, res) => {
  const activityNumber = Number(req.params.id);

  const activity = await findActivity(activityNumber);
  if (!activity)
    return res.status(404).json({ error: 'Activity was not found.' });

  const deactivate = await deactivateActivity(activityNumber);
  if (!deactivate)
    return res.status(400).json({
      error: 'Activity was not deleted',
    });
  
  return res.status(200).json({ Ok: true });
}

module.exports = {
  getAllActivities,
  getActivity,
  postNewActivity,
  putActivity,
  deleteActivity,
}