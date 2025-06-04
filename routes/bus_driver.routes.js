const {
  findAll,
  findOne,
  update,
  remove,
  addBusDriver,
} = require("../controllers/bus_driver.controller");
const router = require("express").Router();

router.post("/", addBusDriver);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
