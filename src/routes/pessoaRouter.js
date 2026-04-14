import express from 'express'
import controller from '../controllers/controller.js'

const router = express.Router()

router.get('/pessoas', controller.retornaPessoas)
// router.get('/pessoas/:id')
router.get('/enderecos', controller.cEndereco.retornaEnderecos)
// router.post('/pessoas')
// router.put('/pessoas/:id')
// router.delete('/pessoas/:id')

export default router
