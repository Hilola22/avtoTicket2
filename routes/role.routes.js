const {
  findAll,
  findOne,
  update,
  remove,
  addRole,
} = require("../controllers/role.controller");
const router = require("express").Router();

router.post("/", addRole);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
