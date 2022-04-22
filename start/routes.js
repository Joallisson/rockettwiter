'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => { //Criando grupo de rotas, nesse caso o grupo de rotas do CRUD
  Route.resource('/tweets', 'TweetController') //Essa rota permite que o usuário use o post, get, put e delete para fazer o crud
  .apiOnly()//.apiOnly() => Api sem as rotas de view
  .except('update') //Não quero que crie essa rota
}).middleware('auth')//Todo as funções do crud passa por esse middleware para autenticar
