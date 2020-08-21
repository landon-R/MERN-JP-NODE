const ProductosModel = require("../models/productosModel");
const multer = require("multer");
const shortid = require("shortid");
const productosModel = require("../models/productosModel");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single("imagen");

//sube el archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ message: error });
    }
    return next();
  });
};

// crea nuevo producto
exports.createProducto = async (req, res, next) => {
  try {
    const producto = new ProductosModel(req.body);
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    res.json({ message: "producto created successfully" });
    await producto.save();
  } catch (error) {
    res.send(error)
    next();
  }
};

// muestra todos los productos
exports.getProductos = async (req, res, next) => {
  try {
    const producto = await ProductosModel.find({});
    res.json(producto);
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

//muestra un producto
exports.getProducto = async (req, res, next) => {
  try {
    const producto = await ProductosModel.findById({
      _id: req.params.IdProducto,
    });
    if (!producto) {
      res.json({ message: "ID producto no existe" });
    }
    res.json(producto);
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

exports.updateProducto = async (req, res, next) => {
  try {
    // nuevo valor para actualizar
    const nuevoProducto = req.body;

    //verifica si hay imagen
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      const productoAnterior = await ProductosModel.findById({_id: req.params.IdProducto});
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    // actualiza producto
    const producto = await ProductosModel.findOneAndUpdate(
      { _id: req.params.IdProducto },
      nuevoProducto,
      { new: true }
    );
    res.json({ message: "producto update sucessfully" });
    res.json(producto);
  } catch (error) {
    res.json({ message: error });
    next();
  }
};

// eliminar producto  
exports.deleteProducto = async (req, res, next) => {
    try {
        const producto = await ProductosModel.findOneAndDelete({_id: req.params.IdProducto})
        res.json({message: `${producto.nombre} deleted successfully`})
    } catch (error) {
        res.json({ message: error });
        next();
    }
}


// endpoint para buscar productos
exports.buscarProducto = async (req, res, next) => {
 try {
   const {query} = req.params
   const producto = await productosModel.find({nombre: new RegExp(query,'i')})
   res.json(producto)
 } catch (error) {
   res.send(error)
   next()
 }
}
