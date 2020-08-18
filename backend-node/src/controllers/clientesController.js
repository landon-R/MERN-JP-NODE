const clientesModel = require("../models/clientesModel");

exports.createCliente = async (req, res, next) => {
  try {
    const cliente = new clientesModel(req.body);
    await cliente.save();
    res.json({ message: "se creo un cliente successfully" });
  } catch (error) {
    res.send(error)
    next();
  }
};

exports.getClientes = async (req, res, next) => {
  try {
    const cliente = await clientesModel.find({});
    res.json(cliente);
  } catch (error) {
    res.send(error)
  }
};

exports.getCliente = async (req, res, next) => {
  try {
    const cliente = await clientesModel.findById({ _id: req.params.IdCliente });
    if (!cliente) {
      res.json({ message: "cliente no existe" });
      next();
    } else {
      res.json(cliente);
    }
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

exports.updateCliente = async (req, res, next) => {
  try {
    const cliente = await clientesModel.findByIdAndUpdate(
      { _id: req.params.IdCliente },
      req.body,
      { new: true }
    );
    res.json(cliente)
    res.send({ message: "cliente no existe" });  ////
  } catch (error) {
    res.send(error)
    next()
  }
};


exports.deleteCliente = async (req, res, next) => {
    try {
        const cliente = await clientesModel.findByIdAndDelete({_id: req.params.IdCliente})
        res.json({message: `cliente ${cliente.nombre} deleted successfully`})
    } catch (error) {
        res.json({ message: error });
        next()
    }
}