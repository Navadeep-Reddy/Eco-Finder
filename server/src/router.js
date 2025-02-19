const { Router } = require("express");
const router = Router();
const controller = require('./controller');

router.post('/score', controller.postScore)


module.exports = router;