const { Router } = require("express");
const controllers = require('../controllers/auth.controller');
const { authenticate } = require("../middleware/auth");
const router = Router();

router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.get('/me', authenticate, controllers.getMe);

module.exports = router;