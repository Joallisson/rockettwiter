'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tweet = use('App/Models/Tweet') //É como se tivesse importando a minha tabela

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {
  /**
   * Show a list of all tweets.
   * GET tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () { //Primeira função a ser executada
    const tweets = await Tweet.query().with('user').fetch() //buscar na tabela dos tweets o relacionamento com o nome "user"
    return tweets
  }

  /**
   * Create/save a new tweet.
   * POST tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth}) {
    const data = request.only(['content']) //pegando o conteudo da do tweet pela requisição
    const tweet = Tweet.create({user_id: auth.user.id, ...data}) //criando o tweet e armazenando ele
    return tweet
  }

  /**
   * Display a single tweet.
   * GET tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const tweet = await Tweet.findOrFail(params.id) //Indo na tabela para encontrar o id do tweet
    return tweet
  }

  /**
   * Delete a tweet with id.
   * DELETE tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response}) {
    const tweet = await Tweet.findOrFail(params.id) //Indo na tabela para encontrar o id do tweet

    if(tweet.user_id !== auth.user.id){ //Se o id do usuário do tweet não for igual ao do usuário que está autenticado
      return response.status(401)
    }

    await tweet.delete(); //deletando o tweet
  }
}

module.exports = TweetController
