import { Link } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Movie } from './types';

export default function WatchlistPage() {
  const [watchlist] = useLocalStorage<Movie[]>('watchlist', []);

  return (
    <div className="p-4">
      <Link to="/" className="text-accent">&larr; Back</Link>
      <h1 className="mt-4 text-2xl font-bold">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="mt-4 text-muted">
          Nothing saved yet. Open a movie and tap "Add to watchlist".
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
