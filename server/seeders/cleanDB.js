// const models = require('../models');
// const db = require('../config/connection');
// const mongoose = require('mongoose'); // Ensure mongoose is imported

// module.exports = async (modelName, collectionName) => {
//   try {
//     const db = mongoose.connection.db; // Correctly access the native db object
//     const collections = await db.listCollections({ name: collectionName }).toArray();
//     if (collections.length > 0) {
//       await db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     console.error(`Error cleaning ${collectionName}:`, err);
//     throw err; // Rethrow or handle as needed
//   }
// };