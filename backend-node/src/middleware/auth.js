const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // autorizacion por el header
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        const err = new Error('No autenticado , no hay jwt')
        err.statusCode = 401
        throw err
    }

    //obtener el token
    const token =authHeader.split(" ")[1]

    let revisarToken

    try {
        revisarToken = jwt.verify(token, "LLAVESECRETA" )
    } catch (err) {
        err.statusCode = 500
        throw err
    }

    //si es un token valido, pero hay algun error
    if(!revisarToken) {
        const err = new Error("no autenticado")
        err.statusCode = 401
        throw err
    }

    next()
}