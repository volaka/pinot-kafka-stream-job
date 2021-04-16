const { Kafka } = require("kafkajs");

run().then(() => console.log("Done"), err => console.log(err));

async function run() {
  const kafka = new Kafka({ brokers: ["localhost:9092"] });

  const producer = kafka.producer()

  await producer.connect()

  for (let i = 0; i < 100; i++) {
    await producer.send({
      topic: 'kafka-test',
      messages: [
        {
          value: JSON.stringify({
            message: `Event ${i}`,
            time: Date.now()
          })
        },
      ],
    })
  }

  await producer.disconnect()
}
