import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { imageUrl } from '../api/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
const poster = imageUrl(movie.poster_path);
const year = movie.release_date ? movie.release_date.slice(0, 4) : 'TBA';

  return (
    <Link to={`/movie/${movie.id}`} className="block overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative aspect-[2/3] bg-line">
        {poster && (
          <img
            src={poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
   {movie.vote_average > 0 && (
  <span className="absolute right-2 top-2 rounded-md bg-canvas/80 px-2 py-1 text-xs font-bold text-accent">
    &#9733; {movie.vote_average.toFixed(1)}
  </span>
)}
    <div className="p-3">
    <h3 className="line-clamp-2 text-sm font-semibold">{movie.title}</h3>
    <p className="mt-1 text-xs text-muted">{year}</p>
    </div>
      </div>
    </Link>
  );
}
