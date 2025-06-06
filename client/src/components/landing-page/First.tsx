import { ArrowRight } from "lucide-react";
import Card from "./Card";
import { useState } from "react";
import Card2 from "./Card2";
import { cn } from "@/lib/utils";

export default function First() {

    const [viewAll, setViewAll] = useState<boolean>(false);

    const counts = [
      { imageURL: "images/landing-page/counts/briefcase.svg", count:  '2324', description: "Live Job" },
      { imageURL: "images/landing-page/counts/company.svg", count:  '97354', description: "Companies" },
      { imageURL: "images/landing-page/counts/users.svg", count:  '3847154', description: "Candidates" },
      { imageURL: "images/landing-page/counts/briefcase.svg", count:  '7532', description: "New Jobs" },
    ]

    const tiles = [
      { imageURL: '/images/landing-page/tiles/pen.png', title: 'Graphics & Design' },
      { imageURL: '/images/landing-page/tiles/code.png', title: 'Code & Programing' },
      { imageURL: '/images/landing-page/tiles/megaphone.png', title: 'Digital Marketing' },
      { imageURL: '/images/landing-page/tiles/monitor.png', title: 'Video & Animation' },
      { imageURL: '/images/landing-page/tiles/music.png', title: 'Music & Audio' },
      { imageURL: '/images/landing-page/tiles/chart-bar.png', title: 'Account & Finance' },
      { imageURL: '/images/landing-page/tiles/first-aid.png', title: 'Health & Care' },
      { imageURL: '/images/landing-page/tiles/database.png', title: 'Data & Science' }
    ]

  return (
    <section className="my-10">
        <div className="flex justify-center items-center gap-8 flex-wrap px-2">
            {counts.map((item, index) => (
              <Card key={index} imageURL={item.imageURL} count={item.count} description={item.description} />
            ))}
        </div>
        <div className="bg-white my-28 ">
          <div className="flex justify-between items-center px-6 lg:px-16 py-10">
              <div className="text-xl lg:text-[2.5rem] font-medium">Popular category</div>
              <button className="hidden lg:flex text-sm lg:text-[1rem] gap-2 text-[#2B5A9E] font-medium py-3 px-8 border border-[#C8D8EF] items-center hover:bg-[#fafafb]" onClick={() => setViewAll(prev => !prev)}>
                {viewAll ? 'View Less': 'View All'}<ArrowRight size={20} className={cn("font-[100] text-[#487ac1]", { "rotate-90": viewAll })}/>
              </button>
          </div>
          <div className="flex justify-evenly items-center px-3 lg:px-16 flex-wrap gap-3 lg:gap-10 pb-20 shadow-md transition duration-1000">
              {tiles.map((item, index) => (
                <Card2
                  key={index}
                  imageURL={item.imageURL}
                  title={item.title}
                  className={viewAll ? '' : (index > 3 ? 'hidden' : '')}
                />
              ))}
          </div>
        </div>
    </section>
  )
}
