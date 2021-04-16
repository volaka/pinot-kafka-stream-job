const { Kafka } = require("kafkajs");

run().then(() => console.log("Done"), err => console.log(err));

async function run() {
  const kafka = new Kafka({ brokers: ["kafka-dev:9092"] });

  const producer = kafka.producer()

  try{
    await producer.connect()

    for (let i = 0; i < 100; i++) {
      console.info("Sending event " + i)
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
  } catch (e) {
    console.error(e)
  }
  

  await producer.disconnect()
}
