import PostImage from "./PostImage"


function PostHeader({
  image,
  title,
  company,
  location
} : {
  image: string | null;
  title: string;
  company: string;
  location: string;
}) {
  return (
    <div className="flex items-center gap-4">
        <div>
            <PostImage postImage={image} />
        </div>
        <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-xl font-[500] text-[#6D6D6D]">{`${company} | ${location}`}</p>
        </div>
    </div>
  )
}

export default PostHeader