import { Button } from "../ui/button";

export default function RoleSelectionModal({
    label,
    secondaryLabel,
    description,
    children,
    handlePrev,
    handleNext,
    prevActionLabel = "Back",
    nextActionLabel = "Next"
    }: {
    label: string;
    secondaryLabel?: string;
    description: string;
    children: React.ReactNode;
    handlePrev: () => void;
    handleNext: () => void;
    prevActionLabel?: string;
    nextActionLabel?: string;
}) {
  return (
    <div className="bg-white rounded-xl w-[60vw] h-[75vh] pt-12 pb-6 shadow-lg">
        <div className="flex flex-col h-[90%] w-full items-center justify-between">
          <div className="p-4 py-12 flex flex-col items-center justify-center gap-3 text-center">
              {/* Main heading */}
              <h2 className="text-black font-bold text-2xl pb-4">{label}</h2>
              {secondaryLabel && <h3 className="text-black/90 font-[500] text-2xl">{secondaryLabel}</h3>}
              <p className="text-neutral-800/65 font-[500] text-xl max-w-[80%]">{description}</p>
          </div>
          <div className="flex-grow bg-red-50">
              {children}
          </div>
        </div>
        <div className="flex justify-between items-center pt-6 px-20 ">
            <Button onClick={handlePrev} size={"lg"}>{prevActionLabel}</Button>
            <Button onClick={handleNext} size={"lg"}>{nextActionLabel}</Button>
        </div>
    </div>
  )
}
