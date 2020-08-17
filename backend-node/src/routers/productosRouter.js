const {Router} = require('express');

const router = Router()
const {createProducto, subirArchivo, getProductos, getProducto, updateProducto, deleteProducto} = require('../controllers/productosController')

router.post('/productos', subirArchivo, createProducto)
router.get('/productos', getProductos)
router.get('/productos/:IdProducto', getProducto)
router.put('/productos/:IdProducto', subirArchivo, updateProducto)
router.delete('/productos/:IdProducto', deleteProducto)


module.exports = router