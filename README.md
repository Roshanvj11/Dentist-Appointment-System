# Dentist-Appointment-System
 
Environment Variables Setup

Before running the project, make sure to set up the .env file with the necessary environment variables.

Create a .env file in the root directory of the project.
Add the following environment variables to the .env file:
1)PORT=5000
2)MONGODB='Dentist-Connect'
3)MONGO_URI='mongodb://localhost:27017'
4)COOKIE_KEY=<your-own-key>
5)CLIENT_ID=<your-client-id>
6)CLIENT_SECRET=<your-client-secret>
PORT: The port number for the server (default: 5000).
MONGODB: The name of the MongoDB database (e.g., 'Dentist-Connect').
MONGO_URI: The MongoDB connection string (e.g., 'mongodb://localhost:27017').
COOKIE_KEY: A unique secret key for securing cookies.
CLIENT_ID: The client ID for OAuth (e.g., Google or another service).
CLIENT_SECRET: The client secret for OAuth.
Make sure to replace the placeholder values (<your-own-key>, <your-client-id>, <your-client-secret>) with your actual credentials.
