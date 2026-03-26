import { useState } from 'react'
import axios from 'axios';
import SearchBar from "../SearchBar/SearchBar";
import css from './App.module.css'
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


interface MovieResponse { 
  results: Movie[];
}


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchMovies = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);

    const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`
      } 
   };

    try { 

      setLoading(true);
      const response = await axios.get<MovieResponse>(options.url, { headers: options.headers });      
      const movies = response.data.results;

      if (movies.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(movies);
        
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className={css.app}>
      <Toaster
      position="top-center"
      reverseOrder={true}
      />
      <SearchBar onSubmit={fetchMovies} />
      <Loader isLoading={loading} hasError={error} />
    {movies.length > 0 && <MovieGrid movies={movies} /> }
    </div>  
  )
}

