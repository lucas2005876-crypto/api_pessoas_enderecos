import db from '../database/db.js'
import controllerEndereco from './constrollerEndereco.js'
import controllerPessoa from './controllerPessoa.js'
class controller {
  constructor() {
    this.cEndereco = new controllerEndereco()
    this.cPessoa = new controllerPessoa()

    this.pessoa = this.cPessoa.pessoa
    this.endereco = this.cEndereco.endereco
  }

  carregarDados = async () => {
    await this.cEndereco.carregarDados()
    await this.cPessoa.carregarDados()

    this.pessoa = this.cPessoa.pessoa
    this.endereco = this.cEndereco.endereco
  }

  retornaPessoas = async (req, res) => {
    try {
      await this.carregarDados()
      let novaPessoa = [...this.pessoa]

      for (const pessoa of novaPessoa) {
        let enderecos = await db.all(
          `SELECT * FROM endereco WHERE idPessoa = ?`,
          [pessoa.id],
        )
        pessoa.enderecos = enderecos
        delete pessoa.idEndereco
      }

      res.status(200).json(novaPessoa)
    } catch (error) {
      console.log('Erro na requisicao', error)
    }
  }

  retornarTudoPorId = async (req, res) => {
    try {
      await this.carregarDados()

      const id = parseInt(req.params.id)

      const pessoa = this.pessoa.find((p) => p.id === id)

      const enderecos = await db.all(
        `SELECT * FROM endereco WHERE idPessoa = ?`,
        [id],
      )

      const pessoaCompleta = {
        ...pessoa,
        enderecos: enderecos,
      }

      delete pessoaCompleta.idEndereco

      res.status(200).json(pessoaCompleta)
    } catch (error) {
      console.log('Erro na requisição', error)
    }
  }
}

export default new controller()
