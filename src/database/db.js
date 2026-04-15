import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// abre conexão com o banco
const db = await open({
  filename: './database.db',
  driver: sqlite3.Database,
})

await db.exec(
  `
  CREATE TABLE IF NOT EXISTS pessoa(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  nome VARCHAR(50),
  email VARCHAR(50),
  cpf NUMBER UNIQUE,
  nascimento DATE,
  telefone NUMBER,
  idEndereco INTEGER,
  FOREIGN KEY(idEndereco) references endereco(id)
  )
  `,
)

await db.exec(
  `
  CREATE TABLE IF NOT EXISTS endereco(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  tipo VARCHAR(30),
  numero NUMBER,
  complemento VARCHAR(50),
  bairro VARCHAR (50),
  cidade VARCHAR(50),
  estado VARCHAR(2),
  cep VARCHAR(8),
  principal BOOLEAN,
  idPessoa INTEGER,
  FOREIGN KEY(idPessoa) references pessoa(id)
  )
  `,
)

export default db
