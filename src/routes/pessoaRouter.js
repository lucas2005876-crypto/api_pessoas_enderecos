import express from 'express'
import controller from '../controllers/controller.js'

const router = express.Router()

router.get('/pessoas', controller.retornaPessoas)
// router.get('/pessoas/:id')
// router.post('/pessoas')
// router.put('/pessoas/:id')
// router.delete('/pessoas/:id')
router.get('/pessoas-simples', controller.cPessoa.retornaPessoaSimples)


router.get('/enderecos', controller.cEndereco.retornaEnderecos)
router.get('/enderecos/:id', controller.cEndereco.retornarEnderecoId)
router.post('/enderecos', controller.cEndereco.adicionarEndereco)


export default router
