const express = require("express");

const ToughtController = require("../controllers/ToughtController");
const checkAuth = require("../helpers/auth").checkAuth;

const router = express.Router();

router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.get("/", ToughtController.showToughts);

module.exports = router;