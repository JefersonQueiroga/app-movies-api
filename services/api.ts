import axios, { AxiosInstance } from 'axios';
import { Movie, MovieDetails } from '../types/Movies';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

apiClient.interceptors.request.use(
  function(config) {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  function(error) {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function(response) {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  function(error) {
    console.error('Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

async function searchMovies(query: string): Promise<Movie[]> {
  try {
    if (!query?.trim()) return [];

    const response = await apiClient.get<{results: Movie[]}>('/search/movie', {
      params: { query: query.trim() }
    });

    return response.data.results || [];
  } catch (error: any) {
    console.error('Erro ao buscar filmes:', error.message);
    return [];
  }
}

async function getPopularMovies(): Promise<Movie[]> {
  try {
    const response = await apiClient.get<{results: Movie[]}>('/movie/popular');
    return response.data.results || [];
  } catch (error: any) {
    console.error('Erro ao buscar filmes populares:', error.message);
    return [];
  }
}

async function getMovieDetails(id: number): Promise<MovieDetails | null> {
  try {
    if (!id || id <= 0) return null;

    const response = await apiClient.get<MovieDetails>(`/movie/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar detalhes do filme:', error.message);
    return null;
  }
}

function getImageUrl(path: string): string {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
}

export const api = {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
  getImageUrl
};