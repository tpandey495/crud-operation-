const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @body    { name, description, price, stock, category }
 */
router.post('/', createProduct);

/**
 * @route   GET /api/products
 * @desc    Get all products (with optional filter, search, sort, pagination)
 * @query   ?category=&search=&sort=&order=&page=&limit=
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 */
router.get('/:id', getProductById);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product by ID
 * @body    { name?, description?, price?, stock?, category? }
 */
router.put('/:id', updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID
 */
router.delete('/:id', deleteProduct);

module.exports = router;
