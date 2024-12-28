'use strict';

// una función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(55)
      // reject('algo fue mal')
    }, ms)
  })
}

const promesa = sleep(2000)

console.log(promesa)

promesa.then((dato) => {
  console.log('han pasado 2 segundos, con dato', dato)
  // throw new Error('FATAL')
  return sleep(2000)
}).catch(err => { // .catch se ejecuta con promesas rechazadas
  console.log('Hubo un error en el primer then:', err)
}).then(() => { // .then solo se ejecuta con promesas completadas satistactoriamente
  console.log('han pasado otros 2 segundos')
  return sleep(2000)
}).catch(err => { // .catch se ejecuta con promesas rechazadas
  console.log('Hubo un error:', err)
})

const promesa2 = readFile('pepe.txt')
const promesa3 = facebookRequest('/api/friends/55')
const promesa4 = getUserFromDatabase(55)

Promise.all([promesa2, promesa3, promesa4]).then(([fileContent, requestResult, user]) => {
  console.log('he terminado')
})