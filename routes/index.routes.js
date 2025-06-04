const router = require("express").Router();
const userRouter = require("../routes/user.routes");
const roleRouter = require("../routes/role.routes");
const userRoleRouter = require("./user_role.routes");
const busesRouter = require("./buses.routes");
const busDriverRouter = require("./bus_driver.routes");
const driversRouter = require("./drivers.routes");
const districtsRouter = require("./districts.routes");
const regionsRouter = require("./regions.routes");

router.use("/users", userRouter);
router.use("/user-role", userRoleRouter);
router.use("/role", roleRouter);
router.use("/buses", busesRouter);
router.use("/bus-driver", busDriverRouter);
router.use("/drivers", driversRouter);
router.use("/districts", districtsRouter);
router.use("/regions", regionsRouter);

module.exports = router;
