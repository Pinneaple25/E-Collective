const activitiesDatabase = require('@mongo/activity.mongo');

const selectAllActivities = async(skip, limit) => 
  await activitiesDatabase
    .find({}, {'_id': 0, '__v': 0})
    .sort({ activityNumber: 1 })
    .skip(skip)
    .limit(limit);

const selectLatestActivityNumber = async() => {
  const latestActivity = await activitiesDatabase
    .findOne()
    .sort('-activityNumber');

  return latestActivity?.activityNumber | 1
}

const findActivity = async(activityId) => {
  const filter = { activityNumber: activityId };
  return await activitiesDatabase.findOne(filter, {'_id': 0, '__v': 0});
}

const activityExists = async(name) => await activitiesDatabase.exists({ name });

const saveActivity = async(newActivity) =>
  await activitiesDatabase.findOneAndUpdate(
    { 
      activityNumber: newActivity.activityNumber, 
    },
    newActivity,
    { 
      upsert: true, 
    }
  );

const insertActivity = async(activity) => {
  const newActivity = Object.assign(activity, {
    activityNumber: (await selectLatestActivityNumber()) + 1,
  });

  await saveActivity(newActivity);
}

const validateActivity = async(activity) => {
  const activityName = activity?.name;

  if (!activityName)
    return 'Missing activity name property.';

  if (await activityExists(activityName))
    return `Activity "${activityName}" already exists.`;
}

module.exports = {
  selectAllActivities,
  findActivity,
  insertActivity,
  validateActivity,
}