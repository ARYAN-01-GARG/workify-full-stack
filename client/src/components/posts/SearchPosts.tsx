import useGetLocations from "@/hooks/useGetLoactions";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function SearchPosts() {
    const [location, setLocation] = useState<string>("");
    const [isRemote, setIsRemote] = useState<boolean>(false);
    const locations = useGetLocations();
  return (
    <form className="bg-white border border-neutral-300 rounded-xl p-4 mb-4 mx-12 flex items-center gap-4">
      <div className="flex items-center gap-4 px-4 py-2 border border-primary rounded-2xl shadow-md w-full max-w-2/3">
        <span className="text-lg font-bold text-white bg-primary rounded-full p-2 shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
          <SearchIcon className="" size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by title or company"
          className="w-full p-2 text-neutral-800 placeholder-neutral-400 placeholder:font-semibold font-semibold outline-none rounded-lg"
        />
      </div>
      <div className="flex items-center gap-4 px-4 py-2 border border-primary rounded-2xl shadow-md flex-1 relative">
        <span className="text-lg font-bold text-primary p-2 cursor-pointer hover:opacity-90 transition-opacity">
          <FaMapMarkerAlt className="" size={20} />
        </span>
        <div onClick={() => setIsRemote((prev) => !prev)} className={cn("absolute cursor-pointer right-4 top-0 h-full flex items-center pl-4", { "opacity-80": isRemote })}>
            <span className="text-white bg-primary rounded-full px-4 py-2">Remote</span>
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by title or company"
          disabled={isRemote}
          className="w-full p-2 outline-none text-neutral-800 placeholder-neutral-400 placeholder:font-semibold font-semibold rounded-lg"
        />
        {
            location.length > 0 &&
            locations.filter((loc) => loc.toLowerCase() === location.toLowerCase()).length != 1 &&
            locations.filter((loc) => loc.toLowerCase().includes(location.toLowerCase())).length > 0 &&
            (
          <div className="absolute z-10 bg-white border border-neutral-300 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto top-10">
            {locations
              .filter((loc) => loc.toLowerCase().includes(location.toLowerCase()))
              .map((loc, index) => (
                <div key={index} onClick={() => setLocation(loc)} className="p-2 hover:bg-neutral-100 cursor-pointer">
                  {loc}
                </div>
              ))}
          </div>
        )}
      </div>
    </form>
  )
}