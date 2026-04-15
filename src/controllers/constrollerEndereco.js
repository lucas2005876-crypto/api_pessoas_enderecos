import db from '../database/db.js'

class controllerEndereco {
  constructor() {
    this.endereco = []
  }

  carregarDados = async () => {
    try {
      const endereco = await db.all('SELECT * FROM endereco')

      for (const e of endereco) {
        let boll = Boolean(e.principal)
        e.principal = boll
      }

      this.endereco = endereco
    } catch (error) {
      console.log('Erro ao carregar em endereços: ' + error.message)
    }
  }

  retornaEnderecos = async (req, res) => {
    try {
      await this.carregarDados()
      res.status(200).json(this.endereco)
    } catch (error) {
      console.log('Erro na requisicao', error)
    }
  }

  retornarEnderecoId = async (req, res) => {
    try {
      let id = req.params.id
      await this.carregarDados()

      const endPorId = this.endereco.filter((endereco) => {
        endereco.id === parseInt(id)
      })

      res.status(200).json(endPorId)
    } catch (error) {
      console.log('Erro na requisicao', error)
    }
  }

  adicionarEndereco = async (req, res) => {
    try {
      let obj = req.body
      let cep = String(obj.cep)

      if (
        typeof obj.numero == 'number' &&
        obj.cep.length === 8 &&
        typeof obj.principal == 'boolean' &&
        typeof obj.idPessoa == 'number'
      ) {
        await db.run(
          `INSERT INTO endereco (tipo, numero, complemento, bairro, cidade, estado, cep, principal, idPessoa)
          VALUES(?,?,?,?,?,?,?,?,?)`,
          [
            obj.tipo,
            obj.numero,
            obj.complemento,
            obj.bairro,
            obj.cidade,
            obj.estado,
            obj.cep,
            obj.principal,
            obj.idPessoa,
          ],
        )
        await this.carregarDados()
        res.status(200).send('Endereço adicionado com sucesso')
      } else {
        throw new Error('O formato dos dados não está de acordo.')
      }
    } catch (error) {
      console.log('Erro na requisicao', error)
      res.status(400).send(error.message)
    }
  }

  deletarEndereco = async (req, res) => {
    try {
      let id = parseInt(req.params.id)
      await db.run(`DELETE FROM endereco WHERE endereco.id = ?`[i])
      await this.carregarDados()
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export default controllerEndereco
