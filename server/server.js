import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import fs from 'fs';
import https from 'https';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const URL = 'http://www.omdbapi.com?apikey=' + process.env.OMDB_API_KEY;
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello Movie Search User'
    });
});

app.post('/', async (req, res) => {
    try {
        console.log("started to fetch");
        console.log(req.body.query);
        const moviesList = await fetch(`${URL}&s=${req.body.query}`);
        const data = await moviesList.json();
        console.log(data);
        const search = data.Search;
        console.log(search);
        res.status(200).send({
            movies: search
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err });

    }
});


const privateKey = fs.readFileSync('/etc/letsencrypt/live/161.35.99.36/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/161.35.99.36/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Backend server listening at https://localhost:${port}`);
});