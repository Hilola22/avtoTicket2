const {
  findAll,
  findOne,
  update,
  remove,
  addDriver
} = require("../controllers/drivers.controller");
const router = require("express").Router();

router.post("/", addDriver);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
