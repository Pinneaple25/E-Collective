const { selectAllActivities, insertActivity, validateActivity } = require('@models/activitiy.model');

const getAllActivities = (_, res) => 
  res.status(200).json(selectAllActivities());

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
  postNewActivity,
}