const router = require("express").Router();

const tokenChecker = require("../tokenize/tokenChecker");

const { readFileLog } = require("../api/log");

router.get("/logs", tokenChecker, readFileLog);

module.exports = router;
