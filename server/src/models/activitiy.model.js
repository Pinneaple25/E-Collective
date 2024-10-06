const activitiesDatabase = require('@mongo/activity.mongo');

const responseFilter = {
  '_id': 0, 
  '__v': 0, 
  status: 0
};

const selectAllActivities = async(skip, limit) => 
  await activitiesDatabase
    .find({ status: true }, responseFilter)
    .sort({ activityNumber: 1 })
    .skip(skip)
    .limit(limit);

const selectLatestActivityNumber = async() => {
  const latestActivity = await activitiesDatabase
    .findOne()
    .sort('-activityNumber');

  return latestActivity?.activityNumber | 1
}

const findActivity = async(activityNumber) => {
  const filter = { activityNumber };
  return await activitiesDatabase.findOne(filter, responseFilter);
}

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
    activityNumber: await selectLatestActivityNumber(),
  });

  await saveActivity(newActivity);
}

const updateActivity = async(activityNumber, activity) => {
  const newActivity = Object.assign(activity, { activityNumber });
  await saveActivity(newActivity);
}

const deactivateActivity = async(activityNumber) => {
  const deactivation = await activitiesDatabase.updateOne(
    { activityNumber }, 
    { status: false }
  );

  return deactivation.modifiedCount === 1;
}

const anyActivity = async(activityNumber) => await activitiesDatabase.exists({ activityNumber });

const activityExists = async(name, number) => await activitiesDatabase.exists({
  name,
  status: true,
  activityNumber: { $ne: number },
});

const validateActivity = async(activity, activityNumber) => {
  const { name } = activity;

  if (!name)
    return 'Missing activity name property.';

  if (await activityExists(name, activityNumber))
    return `Activity "${name}" already exists.`;
}

module.exports = {
  selectAllActivities,
  findActivity,
  insertActivity,
  updateActivity,
  deactivateActivity,
  anyActivity,
  validateActivity,
}