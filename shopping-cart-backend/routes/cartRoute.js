const express = require('express')
const router = express.Router();
const cartController = require('../controller/cartController')

router.post('/',cartController.addCartItem)
router.get('/',cartController.listAllCartItems)
router.delete('/:id',cartController.removeCartItem)

module.exports=router