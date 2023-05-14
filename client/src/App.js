import './App.css';
import SearchIcon from './search.svg'
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';



const App = () => {

  // const MAIN_URL = 'http://localhost:5000/';
  const MAIN_URL = 'https://backend.mrlucasalmeida.com:5000/';


  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // grabs the movies based on search
  const movieSearch = async (title) => {
    const response = await fetch(`${MAIN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        query: title
      })
  });

    /

    if (response.ok) {
      const data = await response.json();
      // returns if the data is empty
      if (data.movies === undefined) {
        return;
      }
      console.log(data.movies);
      setMovies(data.movies);
      
    } else {
      const err = await response.json();
      console.log(err);
      console.log("ERROR");
    }
    

  }

  // updates the movies on the first render

  useEffect(() => {
    movieSearch(searchTerm);
  }, []);

  // updates the movies on the search term change
  useEffect(() => {
    movieSearch(searchTerm);
  }, [searchTerm])






  return (
    <div className="app">
      <h1>MovieSearch</h1>

      <div className="search">
        <input
          placeholder='Search All Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search icon'
          onClick={() => movieSearch(searchTerm)}
        />
      </div>

    {/* displays the movies or says that no movies were found if movies array empty */}
      {
        movies?.length > 0 ? (
          <div className='container'>
            {
            movies.map((movie, idx) =>  (
              <MovieCard movie={movie} key={idx}/>
            ))}
            
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}

    </div>
  );
}

export default App;
