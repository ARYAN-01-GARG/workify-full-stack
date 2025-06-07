import { useState } from "react";
import RoleSelectionModal from "./RoleSelectionModal";
import Select from "./Select";
import { CandidateData } from "./CandidateData";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/store/features/userSlice";
import { AppDispatch } from "@/store/store";
import Skills from "./Skills";

export default function RoleSelection() {

  const dispatch = useDispatch<AppDispatch>();

  const [currentPage , setCurrentPage] = useState(0);
  const user = useSelector(selectUser);

  const [data , setData] = useState({
    location: user.candidate?.location || "",
    domain: user.candidate?.domain || "",
    github: user.candidate?.github || "",
    experience: String(user.candidate?.experience || "0"),
    skills: user.candidate?.skills || [],
  });


  const handleClick = async (action: string) => {
    // Handle the save action here
    if (user.role === "CANDIDATE") {
      dispatch(setUser({
        ...user,
        candidate: {
          ...user.candidate,
          ...data,
          experience: Number(data.experience),
          skills: data.skills
        }
      }));
    }
    if (action === "next") {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
      else if (currentPage === pages.length - 1) {
        // Handle the final submission here
        console.log("Final data:", data);
        // You might want to dispatch an action or make an API call to save the data
      }
    } else {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  }

  const handleChange = (name: string, value: string) => {
    // Handle the change in user data here
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const pages = [
    {
      label: "Your Account is Created- Welcome to Workify!",
      secondaryLabel: "Now, let's set up your path.",
      description: "Are you here to find the right talent, or to start an exciting new job journey?",
      children : <Select/>
    },
    {
      label: "Welcome to Workify! Let's start your journey",
      secondaryLabel: "",
      description: "Your next career move is waiting! Let's fine-tune your profile and get you connected to exciting opportunities tailored just for you.",
      children : <CandidateData data={{ location: data.location, domain: data.domain, github: data.github, experience: data.experience }} onChange={handleChange} />
    },
    {
      label: "Welcome to Workify! Let's start your journey",
      secondaryLabel: "",
      description: "Your next career move is waiting! Let's fine-tune your profile and get you connected to exciting opportunities tailored just for you.",
      children: <Skills skills={data.skills} onChange={(skills) => setData(prev => ({ ...prev, skills }))} key={data.skills.join(',')} />
    },
  ]

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(61,61,61,0.6)] z-50">
      <RoleSelectionModal
        label={pages[currentPage].label}
        secondaryLabel={pages[currentPage].secondaryLabel}
        description={pages[currentPage].description}
        handlePrev={handleClick}
        handleNext={handleClick}
        prevActionLabel={currentPage === 0 ? "" : "Back"}
        nextActionLabel={currentPage === pages.length - 1 ? "Submit" : "Next"}
      >
        {pages[currentPage].children}
      </RoleSelectionModal>
    </div>
  )
}


