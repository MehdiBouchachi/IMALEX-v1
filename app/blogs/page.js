import { fakePosts } from "../../data/fakePosts";
import BlogIndexClient from "../../widgets/blogs/components/BlogIndexClient";
export const metadata = {
  title: "Blog | IMALEX",
  description:
    "Research notes, product science, and field learnings curated by IMALEX.",
};

export default function Page() {
  return <BlogIndexClient posts={fakePosts} />;
}
