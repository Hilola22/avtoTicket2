const {
  findAll,
  findOne,
  update,
  remove,
  addDistrict,
} = require("../controllers/districts.controller");
const router = require("express").Router();

router.post("/", addDistrict);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
