import db from '../database/db.js'

class controllerPessoa {
  constructor() {
    this.pessoa = []
  }

  carregarDados = async () => {
    try {
      const pessoa = await db.all('SELECT * FROM pessoa')

      this.pessoa = pessoa

      console.log('Dados carregados do banco')
    } catch (error) {
      console.log('Erro ao carregar: ' + error.message)
    }
  }

  retornaPessoaSemEnd = (req, res) => {
    try {
      res.status(200).json(this.pessoa)
    } catch (error) {
      console.log('Erro ao retornar enderecos' + error)
    }
  }
}

export default controllerPessoa
