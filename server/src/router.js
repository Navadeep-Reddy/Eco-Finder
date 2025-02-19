const { Router } = require("express");
const router = Router();
const controller = require('./controller');

router.post('/recom', controller.postRecommendFood)

router.get('/userid:googleid', controller.getUserId)

router.post('/mealLog', controller.postMeal)

router.get('/macros/:uid', controller.getMacros)

router.post('/recommendedMacros', controller.postRecommendMacros)

router.post('/verdict', controller.postVerdict)


module.exports = router;