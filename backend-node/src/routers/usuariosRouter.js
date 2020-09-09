const {Router} = require('express');

const router = Router()

const {registrarUsuario, autenticarUsuario} = require('../controllers/usuariosController')

router.post('/crear-cuenta', registrarUsuario ) 
router.post('/iniciar-sesion', autenticarUsuario)


module.exports = router