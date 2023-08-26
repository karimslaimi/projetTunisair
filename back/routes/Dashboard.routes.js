const express = require('express');
const router = express.Router();
const dashboarController = require("../controllers/dashboard.controller");
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');


router.get("/countStat", isAuthenticated, checkRole("ADMIN"), dashboarController.countStat);
router.get("/latestDelay", isAuthenticated, checkRole("ADMIN"), dashboarController.latestDelay);
router.get("/latestContract", isAuthenticated, checkRole("ADMIN"), dashboarController.latestContract);
router.get("/contractCountBySupplier", isAuthenticated, checkRole("ADMIN"), dashboarController.contractCountBySupplier );
router.get("/contractByRetard", isAuthenticated, checkRole("ADMIN"), dashboarController.contractByRetard );
router.get("/getMonthlyVolCounts", isAuthenticated, checkRole("ADMIN"), dashboarController.getMonthlyVolCounts );



module.exports = router;