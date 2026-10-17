# Movie app progress (Oct 17)
Repo: github.com/Haez0004/movie-app (not deployed yet)
Stack: Vite, React, TypeScript, Tailwind v4 (dark theme, gold accent), TMDB API
Key: VITE_TMDB_KEY in .env.local (ignored by Git, never commit it)

Done:
- Theme in src/index.css (canvas, surface, line, ink, muted, accent)
- src/types/index.ts (Movie, MovieListResponse)
- src/api/tmdb.ts (fetchPopularMovies, searchMovies, imageUrl)
- src/hooks/useDebounce.ts
- src/components/MovieCard.tsx (poster, title, year, gold rating)
- src/components/MovieCardSkeleton.tsx
- App.tsx: loading skeletons, error box with Try again, debounced search, no results message
- Genre filter chips (fetch /genre/movie/list)
- Load more (pagination with total_pages)
- Movie detail page (React Router, cast, trailer)
- Watchlist saved in localStorage (custom hook useLocalStorage)
- About page with TMDB attribution notice (required)
- PWA, README with screenshots, deploy to Vercel with VITE_TMDB_KEY set there
Next
- Add the app to the portfolio (mywebsite) and run ./deploy.sh
