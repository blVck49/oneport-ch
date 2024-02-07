const express = require("express");
const { validator } = require("../helpers/helper");
const isAuth = require("../middleware/isAuth");
const { create, fetch, get, update, remove } = require("../controllers/task");
const { createSchema } = require("../validations/task");

router = express.Router();  

router.post("/create", validator.body(createSchema), isAuth, create);

router.get("/", isAuth, fetch);

router.get("/:_id", isAuth, get);

router.patch("/:_id", isAuth, update);

router.delete("/:_id", isAuth, remove);






module.exports = router;
