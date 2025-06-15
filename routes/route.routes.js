const {
  findAll,
  findOne,
  update,
  remove,
  addRoutes
} = require("../controllers/routes.controller");
const router = require("express").Router();

router.post("/", addRoutes);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
