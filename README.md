 ![Login page](https://github.com/user-attachments/assets/2ddd6ba4-ad64-4b37-9092-7533cd2ce79d)
 ![Appointment Form](https://github.com/user-attachments/assets/cab2557f-cfa6-4c7e-abbc-29a40f649a16)
![Appointment](https://github.com/user-attachments/assets/e46be1df-4651-427e-965d-41302be36b94)
![Review Page](https://github.com/user-attachments/assets/f234ac0f-4132-42fe-9005-0f19e677fe3c)
![Admin page](https://github.com/user-attachments/assets/5d6973c7-1476-4d9f-90d7-3e783e0882f9)
![Admin](https://github.com/user-attachments/assets/46a100b7-0642-4be6-938a-5f8f79fdbac8)


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
