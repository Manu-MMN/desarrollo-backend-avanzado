'use strict';

function escribeTras2Segundos(texto, instruccionesParaDespues) {
  setTimeout(function() {
    console.log(texto);
    instruccionesParaDespues()
  }, 2000)
}

function serie(n, fn, callback) {
  if (n == 0) {
    // termino el bucle
    callback();
    return
  }
  n = n - 1
  fn('texto' + n, function() {
    serie(n, fn, callback)
  })
}

serie(5, escribeTras2Segundos, function() {
  console.log('fin')
})

// escribeTras2Segundos('texto1', function() {
//   escribeTras2Segundos('texto2', function() {
//     console.log('fin')
//   })
// })
