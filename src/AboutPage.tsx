import { Link } from 'react-router-dom';

const features = [
  'Search thousands of movies instantly',
  'Filter by genre with one tap',
  'Load more results as you scroll',
  'Watch trailers and see the cast',
  'Save favorites to your watchlist',
];

const tech = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'TMDB API', 'PWA/Service Worker.js',];

export default function AboutPage() {
  return (
    <div className="p-4">
      <Link to="/" className="text-accent">&larr; Back</Link>

      <h1 className="mt-4 text-4xl font-extrabold text-accent">Hk</h1>
      <p className="mt-1 text-xl font-semibold">Find your next favorite movie.</p>
      <p className="mt-3 text-muted">
        Hk is a fast, mobile-first movie discovery app built as a
        learning project, Built 100% with phone in termux.
      </p>

      <h2 className="mt-8 text-lg font-bold">What you can do</h2>
      <ul className="mt-3 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-muted">
            <span className="text-accent">★</span>
            {f}
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-bold">Built with</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
            {t}
          </span>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-bold">Credits</h2>
      <p className="mt-2 text-sm text-muted">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-accent"
      >
        Movie data from TMDB
      </a>
    </div>
  );
}
