const {
  findAll,
  findOne,
  update,
  remove,
  addsubRoute
} = require("../controllers/sub_route.controller");
const router = require("express").Router();

router.post("/", addsubRoute);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
