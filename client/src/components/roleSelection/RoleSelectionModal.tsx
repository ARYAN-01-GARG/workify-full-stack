import { cn } from "@/lib/utils";
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
    handlePrev: ( action : string ) => void;
    handleNext: ( action : string ) => void;
    prevActionLabel?: string;
    nextActionLabel?: string;
}) {

  return (
    <div className="bg-[#F3F6FC] rounded-xl w-[60vw] h-[75vh] pt-12 pb-6 shadow-lg">
        <div className="flex flex-col h-[90%] w-full items-center justify-between">
          <div className="p-4 py-12 flex flex-col items-center justify-center gap-3 text-center">
              {/* Main heading */}
              <h2 className="text-black font-bold text-2xl pb-4">{label}</h2>
              {secondaryLabel && <h3 className="text-black/90 font-[500] text-2xl">{secondaryLabel}</h3>}
              <p className="text-neutral-800/65 font-[500] text-xl max-w-[80%]">{description}</p>
          </div>
          <div className="flex-grow w-full px-12 overflow-hidden">
              {children}
          </div>
        </div>
        <div className={cn("flex justify-between items-center pt-6 px-20", { "justify-end": prevActionLabel === "" }) }>
            {prevActionLabel && <Button onClick={() => handlePrev("back")} size={"lg"}>{prevActionLabel}</Button>}
            <Button type="submit" onClick={() => handleNext("next")} size={"lg"}>{nextActionLabel}</Button>
        </div>
    </div>
  )
}
