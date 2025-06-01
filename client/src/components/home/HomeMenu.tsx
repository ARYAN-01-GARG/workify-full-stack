import { BookOpen, BriefcaseBusinessIcon, FolderOpen, Home, LucideFiles } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { selectUser } from "@/store/features/userSlice";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
function HomeMenu({
   classname
} : {
    classname?: string
}) {
    const { name } = useSelector(selectUser);
    const menuItems = [
        { icon: Home, label: 'My Home' },
        { icon: FolderOpen, label: 'Portfolio' },
        { icon: BriefcaseBusinessIcon, label: 'Jobs' },
        { icon: LucideFiles, label: 'Applied Jobs' },
        { icon: BookOpen, label: 'Blogs' },
    ];
  return (
    <div className={cn(`py-12 w-full px-4 flex flex-col items-center bg-white rounded-xl max-w-[280px] border`, classname)}>
      <div className="flex flex-col items-center">
        <UserAvatar className="h-36 w-36 mt-4 mb-2 border border-gray-500" />
        <h3 className="mb-8 text-2xl font-semibold">{name}</h3>
      </div>
      <div>
        {menuItems.map((item, index) => (
            <div key={index} className="p-1">
                <MenuItem icon={item.icon} label={item.label} />
            </div>
        ))}
      </div>
    </div>
  )
}

const MenuItem = ({
    icon: Icon,
    label,
} :  {
    icon?: React.ElementType,
    label: string
}) => {
    return (
        <span className="flex items-center space-x-4 p-1 justify-start w-full">
            {Icon && <Icon className="h-6 w-6" />}
            <p className="text-lg font-semibold">{label}</p>
        </span>
    )
}

export default HomeMenu;