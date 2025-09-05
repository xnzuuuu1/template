
import express from 'express';
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
  res.render('index', {
    company_name: process.env.COMPANY_NAME || 'My Company',
    index_api_path: process.env.INDEX_API_PATH || '/api/index',
    index_ejs: process.env.INDEX_EJS || 'index.ejs',
  });
});

export default router;
