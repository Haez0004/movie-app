import type { MovieListResponse } from '../types';
export const BASE_URL = 'https://api.themoviedb.org/3';

export const API_KEY: string | undefined = import.meta.env.VITE_TMDB_KEY;
export async function fetchPopularMovies(page = 1): Promise<MovieListResponse> {
  if (!API_KEY) {
    throw new Error('Missing TMDB key. Add VITE_TMDB_KEY to .env.local');
  }

  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status})`);
  }

  return res.json();
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function imageUrl(path: string | null, size = 'w342'): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
