import "dotenv/config"
import amqplib from "amqplib"
const EXCHANGE_NAME = "peticiones-de-tareas"

//conectar con el broker de RabbitMQ
const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL)

//Crear un canal
const channel = await connection.createChannel();

//crear un exchange
await channel.assertExchange(EXCHANGE_NAME, "direct", {
    durable: true // el exchange sobrevive a reinicios del broker (con persistencia)
})

let keepSending = true // si devuelve false abajo, no debería seguir mandando cosas

//bucle para que mande mensajes de forma continua
while (true) {
    const message = {
        tarea: "enviar un email " + Date.now()
    }

    //verificar si puedo enviar más mensajes o tengo que darle un tiempo por que se satura
    
    //Si cuando el embudo puede volver a tragar agua se manifiesta con la propiedad "drain"
    // le decimos que cuando aparezca drain, puede continuar
    if (!keepSending) {
        console.log("CANAL SATURADO ESPERANDO EVENTO DRAIN")
        //aquí quiero parar la ejecución
        await new Promise (resolve => channel.on("drain", resolve)) //aquí quiero que la ejecución siga)
    } //aquí seguimos

//channel.publish devuelve false si está saturado y true si no
//por eso lo hemos metido dentro del keepSending
    
   keepSending = channel.publish(EXCHANGE_NAME, "*", Buffer.from(JSON.stringify(message)))
    console.log("enviado mensaje", message)
    await new Promise(resolve => setTimeout(resolve, 300))  //para que los mande 2 por segundo más o menos
    //aquí se puede ver el flujo https://hawk.rmq.cloudamqp.com/#/exchanges/lcdirvog/peticiones-de-tareas
}




//servicios como los de RabbitMQ externaliza una cola de tareas y se la entrega a un worker, que puede estar corriendo en la misma máquina
//o en máquinas distintas, (cola de tareas = sistema de mensajes entre aplicaciones)
//Nodeapp le manda un mensaje a un worker usando RabbitMQ donde le dice "Cuando puedas, me mandas este mail"