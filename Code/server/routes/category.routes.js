const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

//controllers
const {
  create,
  list,
  update,
  remove,
  read,
} = require("../controllers/category.controller");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug",read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
