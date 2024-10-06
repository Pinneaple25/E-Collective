const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
  activityNumber: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = model('Activity', activitySchema);