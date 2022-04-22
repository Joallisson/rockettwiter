'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TweetSchema extends Schema {
  up () {
    this.create('tweets', (table) => { //Estrutura da tabela de Tweets
      table.increments();
      table //chave estrangeira
        .integer("user_id") //id da chave estrangeira
        .unsigned() //Não vai ter valores nulos
        .notNullable() //Esse campo não pode ser nulo //No caso o tweet não pode existir sem ter alguém alguem que tweetou ele
        .references("id") //Qual campo eu quero referenciar
        .inTable("users") //Qual tabela eu quero referenciar
        .onUpdate("CASCADE") //o que fazer quando id da tabela users for alterado, //O Cascade nesse caso vai alterar usei_id quando o id da tabela users for alterado
        .onDelete("CASCADE"); //o que fazer quando id da tabela users for deletado //O Cascade nesse caso vai deletar usei_id quando o id da tabela users for deletado
      table.string("content", 240).notNullable();//Campo conteúdo com no máximo 240 caracteres
      table.timestamps();
    })
  }

  down () {
    this.drop('tweets')
  }
}

module.exports = TweetSchema
