import { selectUser, setUser } from "@/store/features/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Select() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();


  return (
    <div>
        <div className="flex gap-x-12 w-full justify-center">
            <SelectionCard
                label="Talent Seeker"
                description="( For Recruiters )"
                isSelected={user.role === "RECRUITER"}
                src="/images/role-selection/job-hunter.svg"
                onClick={() => dispatch(setUser({ ...user, role: "RECRUITER" }))}
            />
            <SelectionCard
                label="Job Hunter"
                description="( for Job Seekers )"
                isSelected={user.role === "CANDIDATE"}
                src="/images/role-selection/job-seeker.svg"
                onClick={() => dispatch(setUser({ ...user, role: "CANDIDATE" }))}
            />
        </div>
    </div>
  )
}

const SelectionCard = ({
    label,
    description,
    isSelected,
    src,
    onClick,
}: {
    src: string;
    isSelected: boolean;
    label: string;
    description: string;
    onClick?: () => void;
}) => {
    return (
        <div
            className=" relative border border-[#F3F6FC] bg-white p-4 rounded-xl shadow-md hover:shadow-xl md:w-[200px] lg:w-[300px] transition-shadow duration-300 hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            {/* Image render on Top */}
            <img loading="lazy" src={src} alt="role-selection" />

            {/* Text Content */}
            <h6>{label}</h6>
            <p className="text-sm text-gray-500">{description}</p>

            {/* Selected State */}
            {isSelected ?
                <img src="/images/role-selection/checkboxChecked.svg" alt="checked" className="absolute p-1 border border-[#6D6D6D] rounded-xl top-5 right-5" /> :
                <div className="border border-[#6D6D6D] absolute p-5 rounded-xl top-5 right-5"/>
            }
        </div>
    )
}
