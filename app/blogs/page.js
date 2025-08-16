import { fakePosts } from "../_data/fakePosts";
import BlogsSection from "../_sections/BlogsSection";

export const revalidate = 0; // live while faking

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)] pb-12 pt-20 md:pt-24">
      <BlogsSection
        title="Blog"
        eyebrow="All articles"
        description="Research notes, product science, and field learnings."
        posts={fakePosts}
        basePath="/blogs"
        showCTA={false}
      />
    </div>
  );
}
