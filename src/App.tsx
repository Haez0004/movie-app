import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MovieDetailPage from './MovieDetailPage';
import WatchlistPage from './WatchlistPage';
import AboutPage from './AboutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
