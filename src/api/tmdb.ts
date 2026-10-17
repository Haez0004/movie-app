import type { MovieListResponse, GenreListResponse, MovieDetailResponse } from '../types';
export const BASE_URL = 'https://api.themoviedb.org/3';

export const API_KEY: string | undefined = import.meta.env.VITE_TMDB_KEY;
export async function fetchPopularMovies(page = 1, genreId?: number) {
  const url = genreId
    ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreId}&sort_by=popularity.desc`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load movies');
  const data: MovieListResponse = await res.json();
  return data;
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function imageUrl(path: string | null, size = 'w342'): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
export async function searchMovies(
  query: string,
  page = 1
): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('Missing TMDB key. Add VITE_TMDB_KEY to .env.local');
  }

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status})`);
  }

  return res.json();
}
export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to load genres');
  const data: GenreListResponse = await res.json();
  return data.genres;
}

export async function fetchMovieDetails(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
  );
  if (!res.ok) throw new Error('Failed to load movie details');
  const data: MovieDetailResponse = await res.json();
  return data;
}
