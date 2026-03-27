import axios from 'axios';
import { Movie } from '../types/movie';

interface MovieResponse { 
  results: Movie[];
}

export const searchMovies = async (query: string): Promise<Movie[]> => {

    const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`
      } 
   };
      const response = await axios.get<MovieResponse>(options.url, { headers: options.headers });      
      return response.data.results;

  };
