const pedidosModel = require("../models/pedidosModel");

// crear nuevo pedido
exports.createPedido = async (req, res, next) => {
  try {
    const pedido = new pedidosModel(req.body);
    res.json({ message: "pedido created successfully" });
    await pedido.save();
  } catch (error) {
    res.send(error)
    next();
  }
};

// muestra todos lo pedidos
exports.getPedidos = async (req, res, next) => {
  try {
    const pedido = await pedidosModel
      .find({})
      .populate("cliente")
      .populate("pedido.producto");

    res.json(pedido);
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

exports.getPedido = async (req, res, next) => {
  try {
    const pedido = await pedidosModel
      .findById({ _id: req.params.IdPedido })
      .populate("cliente")
      .populate("pedido.producto");
    if (!pedido) {
      res.json({ message: "Id de pedido no existe" });
    }
    res.json(pedido);
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

exports.updatePedido = async (req, res, next) => {
  try {
    const pedido = await pedidosModel
      .findOneAndUpdate({ _id: req.params.IdPedido }, req.body, { new: true })
      .populate("cliente")
      .populate("pedido.producto");
    res.json(pedido);
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

exports.deletePedido = async (req, res, next) => {
  try {
    const pedido = await pedidosModel.findOneAndDelete({
      _id: req.params.IdPedido,
    });
    res.json({message: `pedido deleted successfully`})
  } catch (error) {
    res.json({ message: error });
    next();
  }
};
