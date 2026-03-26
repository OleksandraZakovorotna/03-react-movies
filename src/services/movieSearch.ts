import axios from 'axios';

export default async function fetchMovies(query: string) {

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
      const response = await axios.get(options.url, { headers: options.headers });      
      const movies = response.data.results;
      return movies;
        
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
