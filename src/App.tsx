import { useEffect, useState } from 'react';
import { fetchPopularMovies } from './api/tmdb';
import type { Movie } from './types';
import MovieCard from './components/MovieCard';
import MovieCardSkeleton from './components/MovieCardSkeleton';
import { searchMovies } from './api/tmdb';
import { useDebounce } from './hooks/useDebounce';

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
const [error, setError] = useState('');
const [loading, setLoading] = useState(true);
const [attempt, setAttempt] = useState(0);
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query.trim());

useEffect(() => {
  async function load() {
  setLoading(true);
  setError('');
    try {
      const data = debouncedQuery
       ? await searchMovies(debouncedQuery)
      : await fetchPopularMovies();
      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
  }
  }
  load();
}, [attempt, debouncedQuery]);
   return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Movie app is alive</h1>
      <p className="mt-1 text-muted">Dark theme test</p>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
         placeholder="Search movies..."
         aria-label="Search movies"
        className="mt-4 w-full rounded-lg border border-line bg-surface p-3 text-ink placeholder:text-muted"
      />
        {error && (
  <div role="alert" className="mt-4 rounded-xl border border-line bg-surface p-4">
    <p className="font-semibold">Could not load movies</p>
    <p className="mt-1 text-sm text-muted">{error}</p>
    <button
      onClick={() => setAttempt(attempt + 1)}
      className="mt-3 rounded-lg bg-accent px-4 py-2 font-semibold text-canvas"
    >
      Try again
    </button>
  </div>
)}
      {loading && <p className="sr-only" role="status">Loading movies</p>}
     <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading
       ? Array.from({ length: 10 }, (_, i) => <MovieCardSkeleton key={i} />)
       : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
