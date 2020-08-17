const { Router } = require("express");

const router = Router();
const { createPedido, getPedidos, getPedido, updatePedido, deletePedido } = require("../controllers/pedidosController");

router.post("/pedidos", createPedido);
router.get("/pedidos", getPedidos);
router.get("/pedidos/:IdPedido", getPedido);
router.put("/pedidos/:IdPedido", updatePedido);
router.delete("/pedidos/:IdPedido", deletePedido);

module.exports = router;
