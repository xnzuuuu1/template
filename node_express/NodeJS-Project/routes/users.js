import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', { 
    company_name: process.env.COMPANY_NAME,
    users_api_path: process.env.USERS_API_PATH,
    users_ejs: process.env.USERS_EJS
  });
});

export default router;
