const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { listen } = require('express/lib/application');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bu0fd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const dressCollection = client.db('fasionHouse').collection('dress');

        app.get('/dress', async (req, res) => {
            const query = {};
            const cursor = dressCollection.find(query);
            const dresses = await cursor.toArray();
            res.send(dresses)
        })
    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running Server')
})

app.listen(port, () => {
    console.log('listening to port', port);
})