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

async function main() {
  // await solo se puede usar en funciones async
  for (let i = 0; i < 5; i++) {
    const resultado = await sleep(2000) // la siguiente líne no se ejecuta hasta que se cumple la promesa del sleep
    console.log('terminado con resultado', resultado)
    if (i === 3) {
      throw new Error('fallo en la tercera vuelta')
    }
  }
}

main().catch(err => console.log(err))