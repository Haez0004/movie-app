export default function MovieCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div className="aspect-[2/3] bg-line" />
      <div className="p-3">
        <div className="h-3 w-3/4 rounded bg-line" />
        <div className="mt-2 h-3 w-1/4 rounded bg-line" />
      </div>
    </div>
  );
}
