//import packages
const express = require('express');
const passport = require('passport');
const userRouter = require('./routes/userRoutes');
const menuRouter = require('./routes/adminRoute/menuRoutes');
const doctorRouter =require('./routes/doctorRoutes')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();
require('./services/passport/passportLocal');
console.log('process.env.PORT ', process.env.PORT);
const PORT = process.env.PORT || 8000;

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  },
});


global.io = io;

// Create a session store using MongoDB
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
  ttl: 60, // 7 days in seconds
});
// create express app
const sessionMiddleware = session({
  name: 'session',
  secret: process.env.COOKIE_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days setting the max age to longer duration
  },
  store: store,
});


io.on('connection', (socket) => {
  console.log('A client connected');
})

app.use((req, res, next) => {
  console.log('HELLO BEFORE');
  next();
});



app.use(cookieParser(process.env.COOKIE_KEY));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('./uploads'));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/user', userRouter);
app.use('/api/admin', menuRouter);
app.use('/api/doctor',doctorRouter);
app.use((req, res, next) => {
  console.log('HELLO AFTER');
  next();
});
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

