import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const URL = 'http://www.omdbapi.com?apikey=' + process.env.OMDB_API_KEY;



app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello Movie Search User'
    });
});

app.post('/', async (req, res) => {
    try {
        const moviesList = await fetch(`${URL}&s=${req.body.query}`);
        const data = await moviesList.json();
        const search = data.Search;
        res.status(200).send({
            movies: search
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });

    }
});


app.listen(5000, () => {console.log('Server is running on port http://localhost:5000')});