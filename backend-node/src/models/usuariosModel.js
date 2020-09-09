const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: "agrega tu nombre",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Usuarios", usuarioSchema);
