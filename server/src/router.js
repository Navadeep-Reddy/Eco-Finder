const { Router } = require("express");
const router = Router();
const { postScore, uploadMiddleware } = require('./controller');

// Use both the upload middleware and the controller
router.post('/score', uploadMiddleware, postScore);

module.exports = router;