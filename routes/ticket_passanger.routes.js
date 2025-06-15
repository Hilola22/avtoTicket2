const {
  findAll,
  findOne,
  update,
  remove,
  addPassanger
} = require("../controllers/passanger.controller");
const router = require("express").Router();

router.post("/", addPassanger);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
