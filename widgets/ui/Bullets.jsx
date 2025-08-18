export default function Bullets({ items = [] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {items.slice(0, 3).map((b) => (
        <li key={b} className="flex gap-2">
          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--bullet)]" />
          <span className="text-[var(--tile-copy)]">{b}</span>
        </li>
      ))}
    </ul>
  );
}
