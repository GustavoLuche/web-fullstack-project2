// backend/config/rabbitmqConfig.js
const amqp = require("amqplib");

/**
 * Configura e estabelece a conexão com o RabbitMQ.
 * Retorna um objeto contendo a conexão, canal e nome do exchange.
 *
 * @returns {Promise<{ connection: amqp.Connection, channel: amqp.Channel, exchange: string }>}
 *    Promise resolvida com o objeto de conexão, canal e nome do exchange.
 * @throws {Error} - Se houver falha na configuração ou estabelecimento da conexão.
 */
async function setupRabbitMQ() {
  try {
    // Conecta-se ao servidor RabbitMQ
    const connection = await amqp.connect("amqp://localhost");

    // Cria um canal de comunicação
    const channel = await connection.createChannel();

    // Define o nome do exchange (fanout para broadcasting)
    const exchange = "logs";

    // Declara o exchange como fanout (broadcast)
    await channel.assertExchange(exchange, "fanout", { durable: false });

    console.log("Connected to RabbitMQ");

    return { connection, channel, exchange };
  } catch (error) {
    console.error("Error setting up RabbitMQ:", error.message);
    throw error;
  }
}

module.exports = { setupRabbitMQ };
