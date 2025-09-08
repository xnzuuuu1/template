
import express from 'express';
const router = express.Router();

// GET users listing
router.get('/', (req, res) => {
  const USERS_NAME = process.env.USERS_NAME;
  const users_api_path = process.env.USERS_API_PATH.replace('${USERS_NAME}', USERS_NAME);
  const users_ejs = process.env.USERS_EJS.replace('${USERS_NAME}', USERS_NAME);
  res.render('users', {
    company_name: process.env.COMPANY_NAME,
    users_api_path,
    users_ejs,
  });
});

export default router;
