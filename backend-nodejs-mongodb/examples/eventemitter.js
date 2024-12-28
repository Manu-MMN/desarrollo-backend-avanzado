'use strict';

const EventEmitter = require('node:events');

const emisor = new EventEmitter();

emisor.on('llamada de telefono', function(quienLlama) {
  if (quienLlama === 'hermana') {
    return
  }
  console.log('ring ring')
})

emisor.once('llamada de telefono', function() {
  console.log('brr brr')
})

emisor.emit('llamada de telefono', 'hermana')
emisor.emit('llamada de telefono', 'hermana')
emisor.emit('llamada de telefono', 'hermana')


