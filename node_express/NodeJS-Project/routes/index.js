
import express from 'express';
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
  const INDEX_NAME = process.env.INDEX_NAME;
  const index_api_path = process.env.INDEX_API_PATH;
  const index_ejs = process.env.INDEX_EJS.replace('${INDEX_NAME}', INDEX_NAME);
  res.render('index', {
    company_name: process.env.COMPANY_NAME,
    index_api_path,
    index_ejs,
  });
});

export default router;
