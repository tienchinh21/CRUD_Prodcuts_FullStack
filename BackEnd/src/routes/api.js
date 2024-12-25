const express = require('express');
const { getProductsCtr, createProductCtr, updateProductCtr, deleteProductCtr, getProductDetailCtr } = require('../controllers/productsController');
const router = express.Router();


router.get('/products/:id', getProductDetailCtr);
router.get('/products', getProductsCtr);

router.post('/products', createProductCtr);
router.put('/products', updateProductCtr);
router.delete('/products/:id', deleteProductCtr);

module.exports = router;