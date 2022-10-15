const express = require('express')
var bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')
const redis = require('redis');
const axios = require('axios');
const cors = require('cors');
var Kafka = require('node-rdkafka');


const client = redis.createClient();

const prisma = new PrismaClient()

client.on('connect', function() {
    console.log('Redis Connected!');
});

client.connect();


var stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
  }, {}, {
    topic: 'smudge_events'
  });

//   write down

   
consumer.connect();

consumer.on('ready', function() {
    // Subscribe to the librdtesting-01 topic
    // This makes subsequent consumes read from that topic.
    consumer.subscribe(['librdtesting-01']);

    // Read one message every 1000 milliseconds
    setInterval(function() {
      consumer.consume(1);
    }, 1000);
  })
  .on('data', function(data) {
    console.log('Message found!  Contents below.');
    console.log(data.value.toString());
  });





const app = express()
const port = 3007
const smudge_main_url = "http://localhost:3005/"

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(cors({
    origin: '*'
}));


app.get('/', (req, res) => {
    //   res.send('Hello World!')
    res.sendFile('index.html', {root: __dirname});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.post('/send_events', async (req, res) => {
    console.log(req.body)
    const public_key = req.body.params.public_key
    const x_coord = req.body.params.x_coord
    const y_coord = req.body.params.y_coord

    
    const website_id = await client.get(public_key);
    if(website_id){
        await prisma.events.create({
            data: {
              website_id: parseInt(website_id),
              x_coord: x_coord,
              y_coord: y_coord
            }
          })
    }else{
        const response = await axios.get(smudge_main_url+'get_shop_id', {
            public_key: public_key
        })
        await client.set(public_key, response.data.website_id)
        await prisma.events.create({
            data: {
              website_id: parseInt(website_id),
              x_coord: x_coord,
              y_coord: y_coord
            }
          })
        message_for_kafka = {
            website_id: parseInt(website_id),
            x_coord: x_coord,
            y_coord: y_coord

        }
        
        var queuedSuccess = stream.write(Buffer.from(JSON.stringify(message_for_kafka)));
        queuedSuccess.
    }
    res.send({success:true})
    
})