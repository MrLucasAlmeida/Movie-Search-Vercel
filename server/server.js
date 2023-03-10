import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3000", "https://movie-search-app-frontend.onrender.com"],
}));

const URL = 'http://www.omdbapi.com?apikey=' + process.env.OMDB_API_KEY;
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });



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


app.listen(port, () => {console.log('Server is running on port http://localhost:' + port)});