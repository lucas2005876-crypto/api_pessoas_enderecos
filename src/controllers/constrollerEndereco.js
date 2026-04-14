import db from '../database/db.js'

class controllerEndereco {
  constructor() {
    this.endereco = []
  }

  carregarDados = async () => {
    try {
      const endereco = await db.all('SELECT * FROM endereco')

      this.endereco = endereco

      console.log('Dados carregados do banco')
    } catch (error) {
      console.log('Erro ao carregar: ' + error.message)
    }
  }

  retornaEnderecos = (req, res) => {}
}

export default controllerEndereco
