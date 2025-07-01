import { Movie, MovieDetails } from '../types/Movies';

const API_KEY = '62b781005e1e580909aeda6f9f3bcb46'; // Substitua pela sua chave
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const api = {
  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return [];
    }
  },

  getPopularMovies: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      return [];
    }
  },

  getMovieDetails: async (id: number): Promise<MovieDetails | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
      return null;
    }
  },

  getImageUrl: (path: string): string => {
    return path ? `${IMAGE_BASE_URL}${path}` : '';
  }
};