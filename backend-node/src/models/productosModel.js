const {Schema, model} = require('mongoose');


const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
    },
    imagen: {
        type: String
    }
},{
    timestamps: true
})

module.exports = model('Productos', productosSchema)