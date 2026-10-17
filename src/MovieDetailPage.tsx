import { useLocalStorage } from './hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails, imageUrl } from './api/tmdb';
import type {Movie,  MovieDetailResponse } from './types';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useLocalStorage<Movie[]>('watchlist', []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="p-4 text-muted">Loading...</p>;
  if (error || !movie) return <p className="p-4">{error || 'Movie not found'}</p>;

const saved = watchlist.some((m) => m.id === movie.id);

function toggleWatchlist() {
  if (!movie) return;
  if (saved) {
    setWatchlist((prev) => prev.filter((m) => m.id !== movie.id));
  } else {
    const entry: Movie = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genre_ids: movie.genres.map((g) => g.id),
    };
    setWatchlist((prev) => [...prev, entry]);
  }
}
  const trailer = movie.videos.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );
  const cast = movie.credits.cast.slice(0, 10);

  return (
    <div className="p-4">
      <Link to="/" className="text-accent">&larr; Back</Link>
      <h1 className="mt-4 text-2xl font-bold">{movie.title}</h1>
      {movie.tagline && <p className="text-muted italic">{movie.tagline}</p>}
      <p className="mt-1 text-sm text-muted">
        {movie.release_date.slice(0, 4)}
        {movie.runtime ? ` · ${movie.runtime} min` : ''}
        {' · '}
        <span className="text-accent">★ {movie.vote_average.toFixed(1)}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {movie.genres.map((g) => (
          <span key={g.id} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
            {g.name}
          </span>
        ))}
      </div>
     <button
      onClick={toggleWatchlist}
      className={`mt-4 rounded-full border border-accent px-5 py-2 text-sm ${
      saved ? 'bg-accent text-canvas' : 'text-accent'
      }`}
    >
       {saved ? '✓ In watchlist' : '+ Add to watchlist'}
    </button>

      <p className="mt-4">{movie.overview}</p>

      {trailer && (
        <div className="mt-6 aspect-video">
          <iframe
            className="h-full w-full rounded"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allowFullScreen
          />
        </div>
      )}

      <h2 className="mt-6 text-lg font-bold">Cast</h2>
      <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
        {cast.map((c) => (
          <div key={c.id} className="w-24 shrink-0 text-center text-xs">
            {c.profile_path ? (
              <img src={imageUrl(c.profile_path) ?? undefined} alt={c.name} className="rounded" />
            ) : (
              <div className="aspect-[2/3] rounded bg-surface" />
            )}
            <p className="mt-1 font-bold">{c.name}</p>
            <p className="text-muted">{c.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
