import HomeMenu from "@/components/home/HomeMenu"
import HomeStats from "@/components/home/HomeStats"
import PostCard from "@/components/posts/PostCard"
import { selectPosts, getAllPosts, selectPostsLoading } from "@/store/features/postsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppDispatch } from "@/store/store"

export default function HomePage() {

  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsLoading);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <main className="h-[100vh] flex items-start justify-between gap-x-6 text-2xl bg-background-primary p-12 ">
      {/* Side menu of user  */}
      <HomeMenu />
      {/* Main content of home page */}
      <div className="w-full flex flex-col gap-y-8 overflow-y-auto h-[90vh]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
      {/* Loading and error states */}
      {loading ? <div className="text-center text-2xl">Loading...</div> : posts.length !== 0 && posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      {error && <div className="text-center text-2xl text-red-500">Error loading posts</div>}
      </div>
      {/* Statistics of job offers */}
      <HomeStats />
    </main>
  )
}
