import { Circle, CircleCheck, LucideMapPin, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {

    const [selectedType, setSelectedType] = useState<string>("Full Time");
  return (
    <section className="md:flex justify-between items-center gap-2 p-4 lg:p-16">
        <div className="md:max-w-[48vw] flex flex-col justify-center items-start gap-5">
        <h1 className="text-4xl lg:text-[3.1rem] font-semibold max-w-[80vw] lg:max-w-[33vw] lg:leading-[3.8rem] mt-10 lg:-mt-2">
            Find a Job With Your Interests and Abilities
        </h1>
        <h3 className="max-w-[92vw] font-semibold text-[1.1rem] lg:text-lg text-[#3D3D3D]">
            <p>Find jobs that match your interests with us.</p>
            <p>Workify provides a place to find your jobs</p>
        </h3>
        <form className="flex items-center py-2 border-2 border-[#3C74BB] pl-2 lg:pl-4 pr-2 gap-2 rounded-2xl" onSubmit={() => {}}>
            <div className="p-2 rounded-full bg-[#2B5A9E] text-white hover:opacity-80 cursor-pointer">
            <SearchIcon type="submit" size={18} onClick={() => {}}/>
            </div>
            <input
            type="text"
            maxLength={30}
            placeholder="Find job here"
            className="bg-transparent flex-grow max-w-[45vw] lg:max-w-[30vw] text-[1.1rem] lg:text-xl font-medium text-[#3D3D3D] placeholder:text-[#3D3D3D] outline-none"
            />
            <button className="flex items-center gap-1 text-[1.1rem] lg:text-xl bg-[#C8D8EF] font-medium text-[#3D3D3D] px-2 py-1 rounded-xl hover:opacity-90">
            <span><LucideMapPin size={16} className="text-primary"/></span>Location
            </button>
        </form>
        <div className="text-[#474C54] font-medium text-[0.9rem]">
            <span className="text-[#9199A3]">Suggestion: </span>
            <span>Designer</span>,
            <span> Programming</span>,
            <span className="text-[#0A65CC]"> Digital Marketing</span>,
            <span> Video</span>,
            <span> Animation</span>.
        </div>
        <div className="flex justify-evenly lg:justify-between gap-2 lg:gap-3 items-center flex-wrap md:flex-nowrap">
            <button onClick={() => setSelectedType("Full Time")} className="bg-[#C8D8EF] text-[#2B5A9E] text-sm lg:text-[1rem] font-medium p-2 md:px-3 md:py-2 rounded-xl flex gap-2 items-center">
            {selectedType === 'Full Time' ?
                <CircleCheck  size={20} className="text-[#213E6B]"/> :
                <Circle  size={20} className="text-[#213E6B]"/>
            }<span>Full Time</span>
            </button>
            <button onClick={() => setSelectedType("Part Time")} className="bg-[#C8D8EF] text-[#2B5A9E] text-sm lg:text-[1rem] font-medium p-2 md:px-3 md:py-2 rounded-xl flex gap-2 items-center">
            {selectedType === 'Part Time' ?
                <CircleCheck  size={20} className="text-[#213E6B]"/> :
                <Circle  size={20} className="text-[#213E6B]"/>
            }<span>Part Time</span>
            </button>
            <button onClick={() => setSelectedType("Remote")} className="bg-[#C8D8EF] text-[#2B5A9E] text-sm lg:text-[1rem] font-medium p-2 md:px-3 md:py-2 rounded-xl flex gap-2 items-center">
            {selectedType === 'Remote' ?
                <CircleCheck  size={20} className="text-[#213E6B]"/> :
                <Circle  size={20} className="text-[#213E6B]"/>
            }<span>Remote</span>
            </button>
        </div>
        </div>
        <div className="hidden md:block scale-110">
        <img src="images/landing-page/heroSectionImage.png" alt="Home image" loading="lazy" className="mx-3 min-h-[40vh] max-w-[40vw] lg:max-w-[43vw]"/>
        </div>
    </section>
  )
}
