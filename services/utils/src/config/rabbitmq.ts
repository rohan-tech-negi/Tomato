import amqp from "amqplib"

let channel: amqp.Channel;

export const connectRabbitMQ = async()=>{
    const connection = amqp.connect(process.env.RABBITMQ_URL!)

    channle = 
}