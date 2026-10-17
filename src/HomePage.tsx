import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchGenres } from './api/tmdb';
import type { Movie, Genre } from './types';
import MovieCard from './components/MovieCard';
import MovieCardSkeleton from './components/MovieCardSkeleton';
import { searchMovies } from './api/tmdb';
import { useDebounce } from './hooks/useDebounce';
import GenreChips from './components/GenreChips';

export default function HomePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
const [error, setError] = useState('');
const [loading, setLoading] = useState(true);
const [attempt, setAttempt] = useState(0);
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query.trim());
const [genres, setGenres] = useState<Genre[]>([]);
const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  fetchGenres().then(setGenres).catch(() => setGenres([]));
}, []);

useEffect(() => {
  async function load() {
  setLoading(true);
  setError('');
    try {
      const data = debouncedQuery
       ? await searchMovies(debouncedQuery)
      : await fetchPopularMovies(1, selectedGenre ?? undefined);
      setMovies(data.results);
      setPage(1);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
  }
  }
  load();
}, [attempt, debouncedQuery, selectedGenre]);
async function loadMore() {
  const nextPage = page + 1;
  try {
    const data = debouncedQuery
      ? await searchMovies(debouncedQuery, nextPage)
      : await fetchPopularMovies(nextPage, selectedGenre ?? undefined);
    setMovies((prev) => [...prev, ...data.results]);
    setPage(nextPage);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Something went wrong');
  }
}
   return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hk</h1>
      <p className="mt-1 text-muted">Find your next favorite movie.</p>
      <Link to="/watchlist" className="mt-2 inline-block text-accent">
      My Watchlist
     </Link>
     <Link to="/about" className="ml-4 inline-block text-sm text-muted">
      About
      </Link>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
         placeholder="Search movies..."
         aria-label="Search movies"
        className="mt-4 w-full rounded-lg border border-line bg-surface p-3 text-ink placeholder:text-muted"
      />
      <GenreChips
       genres={genres}
       selectedId={selectedGenre}
       onSelect={setSelectedGenre}
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
    {!loading && !error && movies.length === 0 && (
  <p className="mt-6 text-center text-muted">
    No movies found for "{debouncedQuery}". Try a different title.
  </p>
)}
     <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading
       ? Array.from({ length: 10 }, (_, i) => <MovieCardSkeleton key={i} />)
       : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
  {!loading && !error && page < totalPages && (
  <button
    onClick={loadMore}
    className="mx-auto mt-6 block rounded-full border border-accent px-6 py-2 text-accent"
  >
    Load more
  </button>
)}
     </div>
    </div>
  );
}
