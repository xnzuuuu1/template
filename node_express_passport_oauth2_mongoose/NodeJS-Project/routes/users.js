
import express from 'express';
const router = express.Router();

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    console.log('User is authenticated');
    return next();
  }
  res.redirect('/');
}

// GET users listing
router.get('/', isAuthenticated, (req, res) => {
  res.render('users', {
    company_name: process.env.COMPANY_NAME || 'My Company',
    users_api_path: process.env.USERS_API_PATH || '/api/users',
    users_ejs: process.env.USERS_EJS || 'users.ejs',
    raw: req.user ? req.user : null,
  });
});

export default router;
