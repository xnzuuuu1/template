import express from 'express';
import passport from 'passport';

const router = express.Router();

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
