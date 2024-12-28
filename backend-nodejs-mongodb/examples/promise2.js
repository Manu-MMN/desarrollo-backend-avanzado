'use strict';

var ingredientes = ['sal','pimienta','conejo','gambas'];

function echar(string) {
  return new Promise((resolve, reject) => {
    console.log('echo', string)
    resolve(string)
  })
}

// echar() recibe un string y retorna una promesa
// var promisedTexts = ingredientes.map(ingrediente => echar(ingrediente));
var promisedTexts = ingredientes.map(echar)

Promise.all(promisedTexts).then(resultados => {
  console.log(resultados)
})
