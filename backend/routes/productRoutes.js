const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware =
  require("../middleware/authMiddleware");

// ADD PRODUCT
router.post(
  "/",
  authMiddleware,
  addProduct
);

// GET PRODUCTS
router.get(
  "/",
  getProducts
);

// UPDATE PRODUCT
router.put(
  "/:id",
  authMiddleware,
  updateProduct
);

// DELETE PRODUCT
router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

module.exports = router;