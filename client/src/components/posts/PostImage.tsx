import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface PostImageProps {
    postImage: string | null;
}

function PostImage({
    postImage,
} : PostImageProps) {
  return (
    <div className="w-16 h-16">
        <Avatar className="w-10 h-10">
            <AvatarImage src={ postImage || "https://github.com/shadcn.png"} alt="@shadcn" className="rounded-full"/>
        </Avatar>
    </div>
  )
}

export default PostImage;