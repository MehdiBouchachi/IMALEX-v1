// app/blogs/_ui/components/CardsGrid.js
"use client";

import BlogCard from "./BlogCard";

export default function CardsGrid({ posts }) {
  return (
    <ul
      className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] items-stretch gap-6 sm:gap-7 lg:gap-8"
      aria-label="Search results"
    >
      {posts.map((p) => (
        <li key={p._id}>
          <BlogCard post={p} href={`/blogs/${p.slug || p._id}`} />
        </li>
      ))}
    </ul>
  );
}
