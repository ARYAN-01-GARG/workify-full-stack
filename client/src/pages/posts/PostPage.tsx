import PostCard from "@/components/posts/PostCard";
import SearchPosts from "@/components/posts/SearchPosts";
import { selectPosts } from "@/store/features/postsSlice"
import { useSelector } from "react-redux"

export default function PostPage() {
  const jobs = useSelector(selectPosts);
  return (
    <main className="w-full bg-[#E6ECF8] min-h-screen pt-12">
      <SearchPosts />
      <div className="flex px-4 lg:px-10 py-10 gap-x-10 items-start">
        <div className="w-full flex-1 flex flex-col items-center justify-start gap-8 ">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <PostCard key={job.id} post={job} />
            ))
          ) : (
            <div className="flex justify-center items-center min-h-screen text-4xl font-bold">
              No Jobs Available
            </div>
            )}
        </div>
        <div className="w-[400px] bg-white border border-neutral-300 mt-2 rounded-xl p-4">
          Filters
        </div>
      </div>
    </main>
  )
}
