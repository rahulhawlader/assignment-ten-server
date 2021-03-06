const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const { listen } = require('express/lib/application');
// const jwt = require('jsonwebtoken');
const { query } = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// midle///////////
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bu0fd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const dressCollection = client.db('fasionHouse').collection('dress');

        // app.post('/login', async (res, req) => {
        //     const user = req.body;
        //     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //         expiresIn: '1d'
        //     })
        //     res.send({ accessToken })
        // })

        app.get('/dress', async (req, res) => {
            const query = {};
            const cursor = dressCollection.find(query);
            const dresses = await cursor.toArray();
            res.send(dresses)
        })


        app.get('/dress/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const dress = await dressCollection.findOne(query);
            res.send(dress);
        })


        /////////////////////////////////////////////////////////////////////
        app.get('/item', async (req, res) => {
            const email = req.query.email
            const query = { email }
            const curser = dressCollection.find(query);
            const rest = await curser.toArray();
            res.send(rest)


        })





        ////////////////////////////////////////////////////////////////
        app.put('/dress/:id', async (req, res) => {
            const id = req.params.id;
            const newQuantity = req.body;
            console.log(newQuantity);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: newQuantity.addQuantity

                }
            };
            const result = await dressCollection.updateOne(filter, updateDoc, options);
            res.send(result)

        })


        app.post('/dress', async (req, res) => {
            const newDress = req.body;
            const result = await dressCollection.insertOne(newDress);
            res.send(result)
        })


        app.delete('/dress/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dressCollection.deleteOne(query);
            res.send(result)
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