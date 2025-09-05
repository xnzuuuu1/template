
import express from 'express';
const router = express.Router();

// GET users listing
router.get('/', (req, res) => {
  res.render('users', {
    company_name: process.env.COMPANY_NAME || 'My Company',
    users_api_path: process.env.USERS_API_PATH || '/api/users',
    users_ejs: process.env.USERS_EJS || 'users.ejs',
  });
});

export default router;
