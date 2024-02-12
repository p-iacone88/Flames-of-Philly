const mongoose = require('mongoose');
require('dotenv').config()

// local only if multiple people working on models at the same time
// mongoose.connect('mongodb://127.0.0.1:27017');
// atlas OR local
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');

module.exports = mongoose.connection;
