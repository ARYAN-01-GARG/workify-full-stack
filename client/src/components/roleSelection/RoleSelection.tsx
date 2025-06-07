import { useState } from "react";
import RoleSelectionModal from "./RoleSelectionModal";

export default function RoleSelection() {
  const [currentPage , setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-[rgba(61,61,61,0.6)] z-50">
      <RoleSelectionModal
        label={pages[currentPage].label}
        secondaryLabel={pages[currentPage].secondaryLabel}
        description={pages[currentPage].description}
        handlePrev={handlePrev}
        handleNext={handleNext}
      >
        {pages[currentPage].children}
      </RoleSelectionModal>
    </div>
  )
}


const pages = [
  {
    label: "Your Account is Created- Welcome to Workify!",
    secondaryLabel: "Now, let's set up your path.",
    description: "Are you here to find the right talent, or to start an exciting new job journey?",
    children : <></>
  },
  {
    label: "Welcome to Workify! Let's start your journey",
    secondaryLabel: "",
    description: "Your next career move is waiting! Let's fine-tune your profile and get you connected to exciting opportunities tailored just for you.",
    children : <></>
  },
  {
    label: "Welcome to Workify! Let's start your journey",
    secondaryLabel: "",
    description: "Your next career move is waiting! Let's fine-tune your profile and get you connected to exciting opportunities tailored just for you.",
    children : <></>
  },
]