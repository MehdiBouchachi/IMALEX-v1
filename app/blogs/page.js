// app/blogs/page.js
import BlogIndexClient from "./_ui/BlogIndexClient";
import { fakePosts } from "../_data/fakePosts";

export const metadata = {
  title: "Blog | IMALEX",
  description:
    "Research notes, product science, and field learnings curated by IMALEX.",
};

export default function Page() {
  return <BlogIndexClient posts={fakePosts} />;
}
