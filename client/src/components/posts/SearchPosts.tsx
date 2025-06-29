
export default function SearchPosts() {
  return (
    <div className="bg-white border border-neutral-300 rounded-xl p-4 mb-4 mx-12">
      <h2 className="text-lg font-bold mb-2">Search Posts</h2>
      <input
        type="text"
        placeholder="Search by title or company"
        className="w-full border border-neutral-300 rounded-lg p-2"
      />
    </div>
  )
}