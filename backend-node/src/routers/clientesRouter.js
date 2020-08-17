const { Router } = require("express");

const { getClientes, createCliente, getCliente, updateCliente, deleteCliente } = require("../controllers/clientesController");

const router = Router();

router.get("/clientes", getClientes);
router.get("/clientes/:IdCliente", getCliente);
router.post("/clientes", createCliente);
router.put("/clientes/:IdCliente", updateCliente);
router.delete("/clientes/:IdCliente", deleteCliente);

module.exports = router;
