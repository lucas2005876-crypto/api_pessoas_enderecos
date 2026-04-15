import db from '../database/db.js'

class controllerPessoa {
  constructor() {
    this.pessoa = []
  }

  carregarDados = async () => {
    try {
      const pessoa = await db.all('SELECT * FROM pessoa')

      this.pessoa = pessoa

    } catch (error) {
      console.log('Erro ao carregar em pessoas: ' + error.message)
    }
  }

  retornaPessoaSimples = (req, res) => {
    try {
      res.status(200).json(this.pessoa)
    } catch (error) {
      console.log('Erro ao retornar enderecos' + error)
    }
  }
}

export default controllerPessoa
