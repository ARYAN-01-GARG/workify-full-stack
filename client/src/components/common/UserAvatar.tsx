import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import { selectUser } from "@/store/features/userSlice";
import { AvatarImage } from "@radix-ui/react-avatar"
import { useSelector } from "react-redux";

function UserAvatar({
  className,
} : {
  className?: string,
}) {
    const user = useSelector(selectUser);
  return (
    <Avatar className={cn("block", className)}>
      <AvatarImage src={ user.profileImage || "https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>{user.name.split(' ')[0][0]}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar