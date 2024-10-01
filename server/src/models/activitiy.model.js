const activitiesDatabase = require('@mongo/activity.mongo');

const activities = [
  {
    Id: 1,
    Name: "Decorations",
  }, {
    Id: 2,
    Name: "Technology",
  }, {
    Id: 3,
    Name: "Food and snacks",
  }
]

const selectAllActivities = () => activities;

const selectLatestActivityNumber = async() => {
  const latestActivity = await activitiesDatabase
    .findOne()
    .sort('-activityNumber');

    return latestActivity?.activityNumber | 1
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
  insertActivity,
  validateActivity,
}