const {
  findAll,
  findOne,
  update,
  remove,
  addPayment
} = require("../controllers/payment.controller");
const router = require("express").Router();

router.post("/", addPayment);
router.get("/", findAll);
router.get("/:id", findOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
