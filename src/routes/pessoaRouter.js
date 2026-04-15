import express from 'express'
import controller from '../controllers/controller.js'

const router = express.Router()

router.get('/pessoas', controller.retornaPessoas)
router.get('/pessoas/:id', controller.retornarTudoPorId)

router.get('/pessoas-simples', controller.cPessoa.retornaPessoaSimples)
router.get('/pessoas-simples/:id', controller.cPessoa.retornaPessoaSimplesPorId)
router.post('/pessoas-simples', controller.cPessoa.adicionarPessoa)

router.get('/enderecos', controller.cEndereco.retornaEnderecos)
router.get('/enderecos/:id', controller.cEndereco.retornarEnderecoId)
router.post('/enderecos', controller.cEndereco.adicionarEndereco)

export default router
