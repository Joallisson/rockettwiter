'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tweet extends Model {
  user(){ //Relacionamento de tweet e usuário
    return this.belongsTo('App/Models/User') //Esse retorno é o mesmo que dizer: TWEET PERTENCE AO USUÁRIO
  }
}

module.exports = Tweet
