// app/blogs/_skeletons/SkeletonGrid.js
import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid({ count = 9 }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] items-stretch gap-6 sm:gap-7 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <SkeletonCard />
        </li>
      ))}
    </ul>
  );
}
