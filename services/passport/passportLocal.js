const { MongoClient } = require('mongodb');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, saveFormData } = require('../DB/database');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        // Find user by username
        const user = await User.findOne({
          $and: [{ username: username }, { password: { $ne: null } }],
        });
        console.log('user', user);
        if (!user) {
          // User not found
          return done(null, false, { message: 'Incorrect username.' });
        }
        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        console.log('match', match);
        if (!match) {
          // Passwords don't match
          return done(null, false, { message: 'Incorrect password.' });
        }
        // Authentication successful
        return done(null, user);
      } catch (error) {
        // Error during authentication
        return done(error);
      }
    }
  )
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/user/google/callback',
    },
    async function (req, accessToken, refreshToken, profile, done) {
      // Verify user profile, fetch user from database, or create a new user
      // console.log('profile', profile);
      try {
        let userData = await User.findOne({
          $and: [{ password: null }, { email: profile._json.email }],
        });
        console.log('userData signin---', userData, 'profile', profile);
        if (userData) {
          return done(null, userData);
        }

        return done(null, false, {
          message: JSON.stringify({
            msg: 'Google authentication failed try again.',
          }),
        });
      } catch (error) {
        // Error during authentication
        return done(error);
      }
    }
  )
);

passport.use(
  'signup-google',
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/user/signup/google/callback',
      scope: ['profile', 'email'],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log('profile signup', profile);
      try {
        const userData = await User.findOne({
          $and: [{ email: profile._json.email }],
        });
        console.log('userData', userData);
        if (userData) {
          return done(null, false, {
            message: JSON.stringify({
              msg: 'Email Already Registered.',
            }),
          });
        }
        const data = {
          password: null,
          authType: 'Google',
          displayName: profile.displayName,
          email: profile._json.email,
          role: 'USER',
          cAt: new Date(),
        };
        console.log('data in signup', data);
        await saveFormData('users', data);
        return done(null, data);
      } catch (error) {
        console.log('Google signup failed try again.', error);
        return done(error);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialization user from the session
passport.deserializeUser(async (id, done) => {
  console.log('id', id);
  try {
    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      // User not found
      return done(null, false, { message: 'User not found' });
    }

    // Successful deserialization
    return done(null, user);
  } catch (error) {
    // Error during deserialization
    return done(error);
  }
});
