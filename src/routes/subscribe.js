const express = require("express");
router = express.Router();  
const isAuth = require("../middleware/isAuth");
const { validator } = require("../helpers/helper");
const { subscribe } = require("../controllers/subscribe")
const { subscribeSchema } = require("../validations/subscribe")


router.post("/", validator.body(subscribeSchema), isAuth, subscribe );



module.exports = router;
