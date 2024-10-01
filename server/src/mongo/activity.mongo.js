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
});

module.exports = model('Activity', activitySchema);