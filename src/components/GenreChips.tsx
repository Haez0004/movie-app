import type { Genre } from '../types';

interface GenreChipsProps {
  genres: Genre[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function GenreChips({ genres, selectedId, onSelect }: GenreChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full border px-4 py-1 text-sm ${
          selectedId === null
            ? 'border-accent bg-accent text-canvas'
            : 'border-line text-muted'
        }`}
      >
        All
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className={`shrink-0 rounded-full border px-4 py-1 text-sm ${
            selectedId === g.id
              ? 'border-accent bg-accent text-canvas'
              : 'border-line text-muted'
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
