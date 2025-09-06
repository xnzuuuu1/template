
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
import User from './models/User.js';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_OAUTH2_CALLBACK_URL = process.env.GOOGLE_OAUTH2_CALLBACK_URL;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_OAUTH2_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    if (profile && profile.provider === 'google' && profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      let dbUser = await User.findOne({ email });
      if (!dbUser) {
        dbUser = new User({
          name: profile.displayName || 'Google User',
          email,
          password: 'defaultPassw0rd' // No password for Google users
        });
        await dbUser.save();
      }
      return done(null, dbUser);
    } else {
      return done(new Error('No valid Google profile received'), null);
    }
  } catch (err) {
    return done(err);
  }
})
);



passport.serializeUser((user, done) => {
  // Store only user._id in session
  done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
  // Fetch user from DB by _id for each request
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
