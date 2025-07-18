import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch } from "@/store/store";
import { getPostById, selectPosts, selectPostsLoading, selectShowPost } from "@/store/features/postsSlice";
import JobCard2 from "@/components/posts/JobCard2";
import JobCard3 from "@/components/posts/JobCard3";

export default function PostDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector(selectPosts);
  const job = useSelector(selectShowPost);
  const loading = useSelector(selectPostsLoading);

  const benefits = [
    [ 'Flexible Hours', 'Remote Work', 'Health Insurance' ],
    [ 'Health Insurance', 'Office Lunch', 'Paid Time Off', 'Gym Membership' ]
  ]

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-4xl font-bold">Loading...</div>;
  }

  if (!job) {
    return <div className="flex justify-center items-center min-h-screen text-4xl font-bold">Job Not Found</div>;
  }
  return (
    <div className="w-full bg-[#E6ECF8] min-h-screen">
      <div className="w-full px-4 lg:px-10 py-10">
        <JobCard2 job={job}/>
        <div className="flex gap-12 w-full py-10">
          <div className="flex flex-col flex-grow gap-8">
            <div className="bg-white px-10 py-12 flex flex-col gap-6 rounded-lg">
              <div className="flex flex-col gap-2 text-xl ">
                <h2 className="font-semibold">About Job</h2>
                <h3 className="text-lg font-medium text-[#3D3D3D]">{job.description ? job.description : 'Senior Full-stack Developer role, with end-to-end ownership of the Company&apos;s Android apps.'}</h3>
              </div>
            </div>
            <div className="flex lg:hidden flex-col gap-6 justify-start">
              <div className="bg-white px-10 pt-10 w-[60vw] rounded-lg">
                <h2 className="text-xl font-semibold ">Skills-Mandatory</h2>
                <div className="flex gap-3 py-5 flex-wrap">
                  {job.skills.map((skill, index) => (
                      <span
                          key={index}
                          className="bg-[#E6ECF8] px-2 py-1 text-[1rem] font-medium rounded-md border border-[#D1D1D1]">
                              {skill}
                      </span>
                  ))}
                </div>
              </div>
              <div className="bg-white px-10 pt-10 w-[60vw] rounded-lg ">
                <h2 className="text-xl font-semibold">Extra Benefits</h2>
                <div className="flex gap-3 py-5 pb-10 flex-wrap">
                  {(job.remote ? benefits[0] : benefits[1]).map((benefit, index) => (
                      <span
                          key={index}
                          className="bg-[#E6ECF8] px-2 py-1 text-[1rem] font-medium rounded-md border border-[#D1D1D1]">
                              {benefit}
                      </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white px-10 py-12 flex flex-col gap-6 rounded-lg">
              <div className="flex flex-col text-xl ">
                <h2 className="font-semibold">About The Company</h2>
                <h3 className="text-lg font-medium text-[#3D3D3D]">{job.company}</h3>
                <div className="text-lg font-medium text-[#2B5A9E]">
                  <a href={`${job.company}`} target="_blank" className="border-b border-[#2B5A9E]"> Website</a> •
                  <span className="border-b border-[#2B5A9E]"> Linkedin</span> •
                  <Link to={''} className="border-b border-[#2B5A9E]"> Profile</Link>
                </div>
              </div>
              <h4 className="text-lg font-medium">{job.company} • 1-10 employees </h4>
              <div className="text-lg font-medium max-w-[90%]">
                <div className="text-[#3D3D3D] pl-1">
                  <p>We provide formal credit access to the underserved Micro & Small sized Indian retailers, through innovative Finance product offerings and underwriting powered by modern Data Science techniques, cutting-edge Technology, and our segment IP.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-6 justify-start">
            <div className="bg-white px-10 pt-10 w-[20vw] rounded-lg">
              <h2 className="text-xl font-semibold ">Skills-Mandatory</h2>
              <div className="flex gap-3 py-5 flex-wrap">
                {job.skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-[#E6ECF8] px-2 py-1 text-[1rem] font-medium rounded-md border border-[#D1D1D1]">
                            {skill}
                    </span>
                ))}
              </div>
            </div>
            <div className="bg-white px-10 pt-10 w-[20vw] rounded-lg ">
              <h2 className="text-xl font-semibold">Extra Benefits</h2>
              <div className="flex gap-3 py-5 pb-10 flex-wrap">
                {(job.remote ? benefits[0] : benefits[1]).map((benefit, index) => (
                    <span
                        key={index}
                        className="bg-[#E6ECF8] px-2 py-1 text-[1rem] font-medium rounded-md border border-[#D1D1D1]">
                            {benefit}
                    </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-[#2B5A9E] font-medium text-xl py-10">Similar Jobs</h2>
        <div className="w-full flex gap-10 relative flex-wrap lg:flex-nowrap">
          {jobs.filter(recommendedJob => recommendedJob.id !== job.id)
               .sort(() => 0.5 - Math.random())
               .slice(0, 2)
               .map((recommendedJob, index) => (
                 <JobCard3 key={index} job={recommendedJob} />
               ))}
        </div>
      </div>
    </div>
  )
}