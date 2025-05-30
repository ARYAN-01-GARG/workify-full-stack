
function HomeStats() {
    const scores = [
        { title: "Posted Job Offers", score: '12,357' , icon : '/images/home/bag.svg' },
        { title: "Employers", score: '3,513' , icon : '/images/home/employee.svg' },
        { title: "Applications sent", score: '52,651' , icon : '/images/home/clip.svg' },
        { title: "Job offers viewed", score: '2,481,455' , icon : '/images/home/folder.svg' },
      ];
  return (
    <div className={`hidden lg:flex bg-white pl-6 pr-10 py-[4.75rem] flex-col w-full max-w-[280px] gap-10 items-start overflow-hidden rounded-xl`}>
          <h1 className="text-xl font-semibold text-center">Job offers Statistics</h1>
          {scores.map((score, index) => (
            <div key={index} className="flex items-center gap-5">
              <div className="w-[60px] h-[60px]">
                <img src={score.icon} alt='Score Image' className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="font-semibold text-xl">{score.score}</h5>
                <p className="font-medium text-[1rem]">{score.title}</p>
              </div>
            </div>
          ))}
        </div>
  )
}

export default HomeStats