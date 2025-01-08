import "dotenv/config"
import amqplib from "amqplib"
const  QUEQUE_NAME = "COLA-DE-TAREAS"

//conectar con el broker de RabbitMQ
const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL)

//Crear un canal
const channel = await connection.createChannel();


//asegurar que existe mi cola de entrada de mensajes

channel.assertQueue(QUEQUE_NAME, {
    durable: true //queque sobrevivirá a broker restarts
})

channel.prefetch(3)  //esto es para decirle que la cola me da los mensajes de 1 en 1
//así va a respetar el tiempo que le hemos dado en el setTimeOut de abajo
// si son 3 segundos, pues 1 cada 3 segundos
//el publicador publica a su ritmo, pero el consumidor procesa a lo que se le diga aquí en prefecht
// así no se satura la máquina en concreto. Se irán acumulando a la cola, eso sí
//suscribirnos a la cola



channel.consume(QUEQUE_NAME, async message => {
    const payload = message.content.toString() // no es obligatorio, pero con el soString() puedo ver en la consola de consumer.js esto:
    //  {"tarea":"enviar un email 1736362338554"}

    //simulamos que hacemos un trabajo con el mensaje
    console.log(payload)

    await new Promise(resolve => setTimeout(resolve, 100))  //para que los mande 2 por segundo más o menos


    //confirmamos que hemos terminado con el trabajo
    channel.ack(message)
})
