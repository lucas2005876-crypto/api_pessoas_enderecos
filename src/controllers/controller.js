import db from '../database/db.js'
import controllerEndereco from './constrollerEndereco.js'
import controllerPessoa from './controllerPessoa.js'
class controller {
  constructor() {
    this.pessoa = []
    this.endereco = []
    this.cEndereco = new controllerEndereco()
    this.cPessoa = new controllerPessoa()
  }

  carregarDados = async () => {
    this.cEndereco.carregarDados()
    this.cPessoa.carregarDados()

    try {
      const endereco = await db.all('SELECT * FROM endereco')
      const pessoa = await db.all('SELECT * FROM pessoa')

      this.pessoa = pessoa
      this.endereco = endereco

      this.pessoa.forEach((pessoa) => {
        const enderecos = db.all(
          `SELECT * FROM endereco WHERE idPessoa =${pessoa.id}`,
        )
        pessoa.enderecos = enderecos
      })

      console.log('Dados carregados do banco')
    } catch (error) {
      console.log('Erro ao carregar: ' + error.message)
    }
  }

  retornaPessoas = async (req, res) => {
    try {
      res.status(200).json(this.pessoa)
    } catch (error) {
      console.log('Erro na requisicao', error)
    }
  }
}

export default new controller()
