'use strict';

function Persona(nombre) {
  this.nombre = nombre
  this.apellido = 'Perez'
  // this.saluda = function() { console.log('Hola soy', this.nombre)}
}

const pepe = new Persona('Pepe');
const luis = new Persona('Luis');


Persona.prototype.saluda = function() { console.log('Hola soy', this.nombre)}
Persona.prototype.adios = function() { console.log('Adios soy', this.nombre)}

pepe.saluda()
pepe.adios()
// luis.saluda()

// Herencia simple

// Quiero hacer un tipo de Objetos llamado Agente que herede de Persona

function Agente(nombre) {
  // heredar el constructor de las personas
  // ejecutar el constructor de las personas, pero con mi "this"
  Persona.call(this, nombre) // super
}

// heredar las propiedades del prototipo de las personas
Object.setPrototypeOf(Agente.prototype, Persona.prototype)

const smith = new Agente('Smith')

smith.saluda()
smith.adios()

// Herencia múltiple

// Quiero que los agentes hereden tanto de las personas como de los superheroes

function Supreheroe() {
  this.vuela = function() { console.log(this.nombre, 'vuela')}
}

// copiar todas las propiedades de los Superheroes
Object.assign(Agente.prototype, new Supreheroe())

smith.vuela()

console.log(smith)
console.log(Agente.prototype)
console.log(smith instanceof Persona)
console.log(smith instanceof Agente)
console.log(smith instanceof Supreheroe)