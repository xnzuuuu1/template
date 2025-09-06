import express from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

// User registration route
router.post('/create', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('<h2>User already exists.</h2><a href="/">Back</a>');
    }
    const user = new User({ name, email, password });
    await user.save();
    res.send(`<h2>Registration successful!</h2><p>Welcome, ${user.name}</p><a href="/">Back</a>`);
  } catch (err) {
    res.status(500).send(`<h2>Error</h2><p>${err.message}</p><a href="/">Back</a>`);
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send(`<h2>Login successful!</h2><p>Welcome, ${user.name}</p><a href="/">Back</a>`);
    } else {
      res.status(401).send('<h2>Login failed!</h2><p>Invalid email or password.</p><a href="/">Back</a>');
    }
  } catch (err) {
    res.status(500).send(`<h2>Error</h2><p>${err.message}</p><a href="/">Back</a>`);
  }
});

// User delete route
router.post('/delete', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await User.deleteOne({ email });
    if (result.deletedCount > 0) {
      res.send(`<h2>User deleted successfully.</h2><a href="/">Back</a>`);
    } else {
      res.status(404).send('<h2>User not found.</h2><a href="/">Back</a>');
    }
  } catch (err) {
    res.status(500).send(`<h2>Error</h2><p>${err.message}</p><a href="/">Back</a>`);
  }
});

// Google OAuth2 authentication routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/users');
  }
);




export default router;
