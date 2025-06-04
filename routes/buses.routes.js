const {
  findAll,
  findOne,
  update,
  remove,
  addBus,
} = require("../controllers/buses.controller");
const router = require("express").Router();

router.post("/", addBus);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
