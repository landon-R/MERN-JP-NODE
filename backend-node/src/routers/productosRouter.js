const { Router } = require("express");

const router = Router();
const {
  createProducto,
  subirArchivo,
  getProductos,
  getProducto,
  updateProducto,
  deleteProducto,
  buscarProducto,
} = require("../controllers/productosController");

router.post("/productos", subirArchivo, createProducto);
router.get("/productos", getProductos);
router.get("/productos/:IdProducto", getProducto);
router.put("/productos/:IdProducto", subirArchivo, updateProducto);
router.delete("/productos/:IdProducto", deleteProducto);

router.post("/productos/busqueda/:query", buscarProducto);

module.exports = router;
