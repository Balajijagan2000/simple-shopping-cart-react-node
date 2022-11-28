const express = require('express')
const router = express.Router();
const productController = require('../controller/productController')

router.post('/',productController.addProduct)
router.get('/',productController.listAllProducts)
router.get('/:id',productController.listProduct)
router.delete('/:id',productController.removeProduct)
router.put('/',productController.updateProduct)

module.exports=router