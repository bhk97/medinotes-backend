const router = require('express').Router();
const chunkController = require('../controllers/chunk_controller');
const upload = require('../config/multer');

// POST /v1/upload-chunk
router.get('/test', (req, res) => {
  console.log("Test route hit");
  res.send({ status: true });
});
router.post('/upload-chunk', upload.single('audio'), chunkController.uploadChunk);

module.exports = router;
