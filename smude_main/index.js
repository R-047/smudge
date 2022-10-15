const express = require('express')
var bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// pools will use environment variables
// for connection information
const app = express()
const port = 3005

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

// website_id, website_url, website_public_key, x cords, y cords


app.get('/', (req, res) => {
//   res.send('Hello World!')
res.sendFile('index.html', {root: __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/register', async (req, res) => {
    const page_url = req.body.params.page_url
    const public_key = uuidv4();
    await prisma.websites.create({
      data: {
        website_url: page_url,
        public_key: public_key,
      }
    })
    res.send({script_tag: `<script id="smudge_event_sender" src='http://localhost:3005/event_sender.js' public-key='${public_key}'></script>`})
})

app.get('/view/', async (req, res) => {
  const date = req.query.date
  const page_url = req.query.page_url
})


app.get('/view/realtime', async (req, res) => {
  const page_url = req.query.page_url
})





app.get('/get_shop_id', async (req, res) => {
  console.log("getting shop id")
  const public_key = req.query.public_key
  const website = await prisma.websites.findFirst({
    where: {
      public_key: public_key,
    },
  })
  res.send({success:true, website_id: website.id})
})





