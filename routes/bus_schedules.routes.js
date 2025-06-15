const {
  findAll,
  findOne,
  update,
  remove,
  addSchedule,
} = require("../controllers/bus_schedules.controller");
const router = require("express").Router();

router.post("/", addSchedule);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
