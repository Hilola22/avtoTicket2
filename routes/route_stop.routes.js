const {
  findAll,
  findOne,
  update,
  remove,
  addrouteStop
} = require("../controllers/route_stop.controller");
const router = require("express").Router();

router.post("/", addrouteStop);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
