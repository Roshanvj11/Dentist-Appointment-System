const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// MongoDB connection URL
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to the MongoDB server');
  } catch (error) {
    console.error('Error connecting to the MongoDB server:', error);
  }
}
// Define the User model
const User = {
  async findOne(query) {
    try {
      const database = client.db(process.env.MONGODB);
      const collection = database.collection('users');
      return await collection.findOne(query);
    } catch (error) {
      console.error('Error finding user in MongoDB:', error);
      return null;
    }
  },
  async findById(userId) {
    try {
      const database = client.db(process.env.MONGODB);
      const collection = database.collection('users');
      const user = await collection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        console.error('User not found');
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error finding user in MongoDB:', error);
      return null;
    }
  },

  async createUser(userData) {
    try {
      const database = client.db(process.env.MONGODB);
      const collection = database.collection('users');
      const result = await collection.insertOne(userData);
      console.log(`${result.insertedCount} document(s) inserted`);
    } catch (error) {
      console.error('Error creating user in MongoDB:', error);
    }
  },
};

async function saveFormData(collectionName, formData) {
  try {
    // Access the database and collection
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    // Insert the form data into the collection
    const result = await collection.insertOne(formData);
    console.log(`${result.insertedCount} document(s) inserted`);
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
  }
}

async function updateOne(collectionName, filter, update) {
  try {
    // Connect to the MongoDB database
    const database = client.db(process.env.MONGODB);

    // Access the specified collection
    const collection = database.collection(collectionName);
    console.log('filter', filter, 'update', update);
    // Perform the update operation
    const result = await collection.updateOne(filter, update);

    console.log('Document updated successfully:', result);
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

async function checkUserExists(collectionName, query) {
  try {
    console.log('query in user check', query);
    // Access the database and collection
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    // Check if a document exists in the collection that matches the query
    const user = await collection.findOne(query);
    return user !== null; // Return true if user exists, false otherwise
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false; // Return false in case of an error
  }
}

async function getUsers(collectionName) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.find({}).toArray();
    console.log(user);
    return user
  } catch (error) {
    console.error('Error Checking user Datas:', error);
    return false;
  }
}

//total Appointment Table

async function findUserAppointments(collectionName) {

  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.find({}).sort({ 'appointmentDate': 1 }).toArray();
    console.log(user);
    return user;
  } catch (error) {
    console.error("error in finding user id errors:", error);
  }
}

//Total appointment count
async function appointMentCount(collectionName) {
  try {
    const aggregationPipeline = [
      {
        '$count': 'string'
      }
    ]
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    // console.log(user);
    return user
  } catch (error) {
    console.error('error in counting data:', error);
  }
}

//Pending Appointment Count

async function pendingAppointMentCount(collectionName) {
  try {
    const aggregationPipeline = [
      {
        '$match': {
          'status': 'pending'
        }
      }, {
        '$count': 'pendingStatus'
      }
    ]
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    // console.log(user);
    return user
  } catch (error) {
    console.error('error in counting data:', error);
  }
}

//Today's appointment Count

async function todayAppointment(collectionName) {
  try {

    const today = new Date(); // Get today's date
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Start of tomorrow

    console.log("startOfDay:", startOfDay, "endOfDay:", endOfDay);

    const aggregationPipeline = [
      {
        '$match': {
          '$and': [
            {
              'appointmentDate': {
                '$gte': startOfDay,
                '$lte': endOfDay
              }
            }
          ]
        }
      }, {
        '$count': 'number'
      }
    ];

    console.log("aggregationPipeline:", aggregationPipeline);
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    console.log('userTodayAppointment', user);
    return user;
  } catch (error) {
    console.error("error in getting today appointment database:", error);
  }
}

//Today appointment List
async function todayAppointmentList(collectionName) {
  try {

    const today = new Date(); // Get today's date
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Start of tomorrow

    console.log("startOfDay:", startOfDay, "endOfDay:", endOfDay);

    const aggregationPipeline = [
      {
        '$match': {
          '$and': [
            {
              'appointmentDate': {
                '$gte': startOfDay,
                '$lte': endOfDay
              }
            }
          ]
        }
      }
    ];

    console.log("aggregationPipeline:", aggregationPipeline);
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    console.log('userTodayAppointmentList:', user);
    return user;
  } catch (error) {
    console.error("error in getting today appointment list database:", error);
  }
}

//This Week Appointment List

async function thisWeekAppointmentList(collectionName) {
  try {

    const today = new Date(); // Get today's date
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Start of current week (Sunday)
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay())); // End of current week (Saturday)

    console.log("startOfWeek:", startOfWeek, "endOfWeek:", endOfWeek);

    const aggregationPipeline = [
      {
        '$match': {
          '$and': [
            {
              'cAt': {
                '$gte': startOfWeek,
                '$lte': endOfWeek
              }
            }
          ]
        }
      }
    ];

    console.log("aggregationPipeline:", aggregationPipeline);
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    console.log('ThisWeekAppointment', user);
    return user;
  } catch (error) {
    console.error("error in getting this Week appointment database:", error);
  }
}


//total Patients Completed

async function findCompletedPatients(collectionName) {
  try {
    const aggregationPipeline = [
      {
        '$match': {
          'status': 'Completed'
        }
      }, {
        '$count': 'Completed'
      }
    ]
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    console.log(user);
    return user
  } catch (error) {
    console.error('error in counting data:', error);
  }
}

//Offline Patient Count

async function findOfflinePatientsCount(collectionName) {
  try {
    const aggregationPipeline = [
      {
        '$match': {
          'mode': 'Offline'
        }
      }, {
        '$count': 'offlineCount'
      }
    ]
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    console.log(user);
    return user
  } catch (error) {
    console.error('error in counting data:', error);
  }
}

async function closeConnection() {
  try {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

async function addOfflinePatient(collectionName, userData) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(userData);
    console.log(`${result.insertedCount} document(s) inserted`);
    return result

  } catch (error) {
    console.error('Error creating user in MongoDB:', error);
  }
}

//Offlin patient List
async function findOfflinePatientList(collectionName) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.find({ mode: 'Offline' }).toArray();
    console.log(user);
    return user;
  } catch (error) {
    console.error("error in finding user id errors:", error);
  }
}

//cancel AppointMent From Client
async function findOfflinePatientAndDeleteList(collectionName, query) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    console.log('query:',query);
    const user = await collection.deleteOne({ _id: new ObjectId(query) });
    // console.log(user);
    return user;
  } catch (error) {
    console.error("error in finding user id errors:", error);
  }
}


//DeleteReview
async function deleteReview(collectionName, query) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    console.log('query:',query);
    const user = await collection.deleteOne({ _id: new ObjectId(query) });
    // console.log(user);
    return user;
  } catch (error) {
    console.error("error in finding user id errors:", error);
  }
}

//Update notes

async function updateNotes(collectionName, filter, query) {
  console.log('filter', filter)
  console.log('query', query)
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.updateOne(filter, query);
    console.log('result', user);
    return user;
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
  }
}
//getting notepad values

async function findNotepadValues(collectionName, query) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.find(query).toArray();
    console.log(user);
    return user;
  } catch (error) {
    console.error("error in finding user id errors:", error);
  }
}

//post review Data
async function addReviewData(collectionName, userData) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(userData);
    console.log(`${result.insertedCount} document(s) inserted`);
    return result

  } catch (error) {
    console.error('Error addReviewData user in MongoDB:', error);
  }
}

async function allReviewData(collectionName) {
  try {
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const result = await collection.find({}).toArray();
    console.log('database All Review Data:', result);
    return result
  } catch (error) {
    console.error('getting review error:', error);
  }
}

// async function addLikes(collectionName,query) {
//   try {
//     const database = client.db(process.env.MONGODB);
//     const collection = database.collection(collectionName);
//     const result = await collection.findByIdAndUpdate(query);
//     console.log('database All Review Data:',result);
//     return result
//   } catch (error) {
//     console.error('getting review error:',error);
//   }
// }

//Average Rating


async function averageRating(collectionName) {
  try {
    const aggregationPipeline = [
      {
        '$group': {
          '_id': null,
          'avgRating': {
            '$avg': '$rating'
          }
        }
      }
    ]
    const database = client.db(process.env.MONGODB);
    const collection = database.collection(collectionName);
    const user = await collection.aggregate(aggregationPipeline).toArray();
    const averageRating = user.map(item => { return item.avgRating });
    console.log('averageRating:',averageRating);
    const roundedValue=Math.round(averageRating * 2) / 2;
    console.log('roundedValue:', roundedValue)
    console.log(user);
    return roundedValue
  } catch (error) {
    console.error('error in counting data:', error);
  }
}


module.exports = {
  connectToDatabase,
  saveFormData,
  closeConnection,
  checkUserExists,
  updateOne,
  getUsers,
  appointMentCount,
  todayAppointment,
  todayAppointmentList,
  thisWeekAppointmentList,
  pendingAppointMentCount,
  findUserAppointments,
  addOfflinePatient,
  findOfflinePatientList,
  findOfflinePatientAndDeleteList,
  updateNotes,
  findNotepadValues,
  findCompletedPatients,
  findOfflinePatientsCount,
  addReviewData,
  addOfflinePatient,
  allReviewData,
  averageRating,
  deleteReview,
  // addLikes,
  User,
};
