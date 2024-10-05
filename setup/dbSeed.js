const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Dentist-Connect';

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to insert admin user
async function insertAdmin() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to the database');

    // Select the database
    const db = client.db(dbName);

    // Check if admin user already exists
    const existingAdmin = await db
      .collection('users')
      .findOne({ username: 'admin' });

    if (!existingAdmin) {
      // Hash the password
      const hashedPassword = await bcrypt.hash('admin', 10);

      // Create the admin user object
      const adminUser = {
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
      };

      // Insert the admin user into the 'users' collection
      await db.collection('users').insertOne(adminUser);

      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error inserting admin user:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Call the function to insert admin user
insertAdmin();