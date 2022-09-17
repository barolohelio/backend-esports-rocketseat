/********************** ANOTAÇÕES **********************************************
 *   * HTTP methods / API RESTful methods 
 *   * HTTP Codes(Ele retorna informações da resposta, como por exemplo erros, 
 *   * sucesso, tipo e etc...)
 *   *
 *   - Métodos GET, POST, PUT, PATCH, DELETE, 
 *   * 
 *   * HTTP CODES 
 *   * Códigos iniciados com:
 *   * 2 - São de sucesso
 *   * 3 - Sao de redirecionamento
 *   * 4 - Erros gerados na nosso aplicação, como um código bugado
 *   * 5 - Erros inesperados
 *   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 *   * 
 */


import express from 'express'

const app = express()

//listagem de novo anúncio
app.get('/games', (request, response) => {
  return response.json([])
});

//No método post eu devo escrever no plural
//Criação de novo anúncio 
app.post('/ads', (request, response) => {
  return response.status(201).json([])

});

//Listagem de anúncios por game
app.get('/games/:id/ads', (request, response) => {
  // const gameId = request.params.id;  
  return response.json([
    {id: 1, name: 'Anuncio 1'},
    {id: 2, name: 'Anuncio 2'},
    {id: 3, name: 'Anuncio 3'},
    {id: 4, name: 'Anuncio 4'},
  ])
});

app.get('/games/:id/discord', (request, response) => {
  return response.json([])
});

app.listen(3333)

 /** ----------------------------- TYPESCRIPT-----------------------------------
  *  _Tipagem estática permite a gente definir o formato que esperamos de cada
  *  informação. 
  * 
  * _Tipagem Dinâmica os tipos dos dados nao sao definidos, como por exemplo no
  * javascript e PHP em versões anteriores
 /** -----------------------------TYPESCRIPT----------------------------------*/ 
