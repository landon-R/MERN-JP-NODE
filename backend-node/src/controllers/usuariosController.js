const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsuarioModel = require("../models/usuariosModel");



exports.registrarUsuario = async (req, res, next) => {
  //leer datos y ponerlos en la db y poner bcrypt
  try {
    const usuario = new UsuarioModel(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 10);
    res.json({ message: "usuario registrado successfully" });
    await usuario.save();
  } catch (err) {
    console.log(err);
    next();
  }
};




exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await UsuarioModel.findOne({ email });

  if (!usuario) {
    // si el usuario no existe
    res.status(401).json({ message: "ese usuario no existe" });
    next();
  } else {
    //si el usuario existe, verificar el password si es correcto o incorrecto
    if (!bcrypt.compareSync(password, usuario.password)) {
      res.status(401).json({ message: "password incorrecto" });
      next();
    } else {
      //si el password es correcto, firmar el token mediante el payload
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "LLAVESECRETA",
        { expiresIn: "1h" }
      );
      //retornar el token
      res.json({token})
    }
  }
};
