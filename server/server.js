import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const URL = 'http://www.omdbapi.com?apikey=' + process.env.OMDB_API_KEY;
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });



app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello Movie Search User'
    });
});

app.get('/:query', async (req, res) => {
    try {
        const moviesList = await fetch(`${URL}&s=${req.params.query}`);
        const data = await moviesList.json();
        const search = data.Search;
        res.status(200).send({
            movies: search
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err });

    }
});


app.listen(PORT, () => {console.log('Server is running on port http://localhost:' + PORT)});