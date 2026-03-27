import { useState } from 'react'
import SearchBar from "../SearchBar/SearchBar";
import css from './App.module.css'
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { searchMovies } from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<boolean>(false);



  const fetchMovies = async (query: string) => {

    setMovies([]);
    setError(false);
    setSelectMovie(null);

    try { 
      setLoading(true);
      
      const response = await searchMovies(query);


      if (response.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(response);
        
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
      <Loader isLoading={loading}/>
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={(movie) => setSelectMovie(movie)} />} 
      {selectMovie && <MovieModal movie={selectMovie} onClose={() => setSelectMovie(null)} />}
    </div>  
  )
}

