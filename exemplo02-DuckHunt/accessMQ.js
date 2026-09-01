const amqp = require('amqplib');

async function connect() {
  try {
    // Substitua pelos seus dados
    const uri = "amqps://brinks:*********@b-92399a51-dc87-45be-a2e5-deb525d74ada.mq.us-east-1.amazonaws.com:5671/DEV";

    // Conexão com o broker
    const connection = await amqp.connect(uri);

    // Cria um canal
    const channel = await connection.createChannel();

    // Nome da fila
    const queue = 'minhaFila';

    // Garante que a fila existe
    await channel.assertQueue(queue, { durable: true });

    // Envia uma mensagem
    const msg = 'Olá Amazon MQ!';
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log("Mensagem enviada:", msg);

    // Consome mensagens
    channel.consume(queue, (message) => {
      if (message !== null) {
        console.log("Mensagem recebida:", message.content.toString());
        channel.ack(message); // Confirma recebimento
      }
    });

  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

connect();
