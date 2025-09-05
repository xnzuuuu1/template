import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    company_name: process.env.COMPANY_NAME,
    index_api_path: process.env.INDEX_API_PATH,
    index_ejs: process.env.INDEX_EJS,
  });
});

export default router;
