import RoleInput from "./RoleInput";
import RoleObjectField from "./RoleObjectField";
import useGetLocations from "@/hooks/useGetLoactions";

export function CandidateData({
    data,
    onChange,
}: {
    data: {
        location: string;
        domain: string;
        github: string;
        experience: string;
    };
    onChange: ( name : string , value : string ) => void;
}) {

    const locations = useGetLocations();

  return (
    <div className="px-12 ">
        <h3 className="font-semibold text-xl py-5">Your Prefrences</h3>
        <div className="flex gap-x-6 flex-wrap w-full my-4 mb-6">
            <RoleObjectField
              label="Location"
              placeholder="Banglore, India"
              value={data.location}
              options={locations}
              onChange={(val) => onChange("location", val)}
            />
            <RoleInput
                label="Domain"
                placeholder="e.g. Web Development, Data Science"
                value={data.domain}
                onChange={(e) => onChange("domain", e.target.value)}
            />
        </div>
        <div className="flex gap-x-6 flex-wrap w-full my-4 mb-6">
            <RoleInput
                label = "Github Profile"
                placeholder = "https://github.com/yourusername"
                value = {data.github}
                onChange = {(e) => onChange("github", e.target.value)}
            />
            <RoleObjectField
              label="Experience"
              placeholder="Fresher"
              value={data.experience}
              options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              onChange={(val) => onChange("experience", val)}
            />
        </div>
    </div>
  )
}
