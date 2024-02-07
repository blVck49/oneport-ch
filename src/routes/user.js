const express = require("express");
const { validator } = require("../helpers/helper");
const { create, login } = require("../controllers/user");
const { registerSchema, loginSchema, validateRegistration, validateLogin } = require("../validations/user");

router = express.Router();  

router.post("/register", validator.body(registerSchema), validateRegistration, create);

router.post("/login", validator.body(loginSchema), validateLogin, login);



module.exports = router;
