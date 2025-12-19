const mongoose = require('mongoose');

module.exports = function connect() {
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};
