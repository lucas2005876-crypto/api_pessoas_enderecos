import db from '../database/db.js'

class controllerPessoa {
  constructor() {
    this.pessoa = []
  }

  carregarDados = async () => {
    try {
      const pessoa = await db.all('SELECT * FROM pessoa')

      for (const p of pessoa) {
        p.cpf = this.formatarCpf(p.cpf)
        p.telefone = '+' + p.telefone
      }

      this.pessoa = pessoa
    } catch (error) {
      console.log('Erro ao carregar em pessoas: ' + error.message)
    }
  }

  retornaPessoaSimples = async (req, res) => {
    try {
      await this.carregarDados()
      res.status(200).json(this.pessoa)
    } catch (error) {
      console.log('Erro ao retornar pessoas' + error)
    }
  }

  retornaPessoaSimplesPorId = async (req, res) => {
    try {
      let id = req.params.id
      await this.carregarDados()

      const pessPorId = this.pessoa.filter((pessoa) => {
        pessoa.id === parseInt(id)
      })

      res.status(200).json(pessPorId)
    } catch (error) {
      console.log('Erro na requisicao', error)
      res.status(400).send(error.message)
    }
  }

  adicionarPessoa = async (req, res) => {
    try {
      let obj = req.body

      if (
        typeof obj.nome == 'string' &&
        typeof obj.cpf === 'number' &&
        typeof obj.telefone == 'number'
      ) {
        await db.run(
          `INSERT INTO pessoa (nome, email, cpf, nascimento, telefone, idEndereco)
          VALUES(?,?,?,?,?,?)`,
          [
            obj.nome,
            obj.email,
            obj.cpf,
            obj.nascimento,
            obj.telefone,
            obj.idEndereco,
          ],
        )
        await this.carregarDados()
        res.status(200).send('Pessoa adicionada com sucesso')
      } else {
        throw new Error('O formato dos dados não está de acordo.')
      }
    } catch (error) {
      console.log('Erro na requisicao', error)
      res.status(400).send(error.message)
    }
  }

  deletarPessoa = async (req, res) => {
    try {
      const id = parseInt(req.params.id)

      if (!id) {
        throw new Error('ID inválido')
      }

      await db.run(`DELETE FROM endereco WHERE idPessoa = ?`, [id])

      const result = await db.run(`DELETE FROM pessoa WHERE id = ?`, [id])

      if (result.changes === 0) {
        return res.status(404).send('Pessoa não encontrada')
      }

      await this.carregarDados()

      res.status(200).send('Pessoa e endereços deletados com sucesso')
    } catch (error) {
      console.log('Erro ao deletar pessoa:', error)
      res.status(400).send(error.message)
    }
  }

  formatarCpf = (cpf) => {
    cpf = cpf.toString()

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return cpf
  }
}

export default controllerPessoa
