const { Router } = require("express");
const controllers = require('../controllers/auth.controller');
const router = Router();

router.post('/login', controllers.login);
router.post('/register', controllers.register);

module.exports = router;