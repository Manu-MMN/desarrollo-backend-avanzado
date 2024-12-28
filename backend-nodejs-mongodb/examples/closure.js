'use strict';

function creaVehiculo(nombre) {

  const numRuedas = 4;

  return {
    saluda: function() { console.log('Hola soy', nombre, 'y tengo', numRuedas, 'ruedas')},
    setNumRuedas: function(valor) { numRuedas = valor }
  }
}

const seat = creaVehiculo('Seat Ibiza')
const opel = creaVehiculo('Opel Astra')

// seat.saluda()

setTimeout(seat.saluda, 2000)
setTimeout(opel.saluda, 2000)

