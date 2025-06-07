import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function Skills({
  skills = [],
  onChange,
}: {
  skills?: string[];
  onChange?: (skills: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [skillList, setSkillList] = useState<string[]>(skills);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skillList.includes(trimmed) && skillList.length < 10) {
      const updated = [...skillList, trimmed];
      setSkillList(updated);
      onChange?.(updated);
    }
    setInput("");
  };

  const removeSkill = (skill: string) => {
    const updated = skillList.filter((s) => s !== skill);
    setSkillList(updated);
    onChange?.(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="flex flex-col gap-y-4 flex-grow p-12">
      <label className="font-[500] text-xl ">Skills</label>
      <div className="flex gap-2 flex-wrap mb-2">
        {skillList.map((skill) => (
          <span
            key={skill}
            className="flex items-center bg-[#e6f0fa] text-[#2B5A9E] px-3 py-1 rounded-full text-lg font-medium gap-1 border border-[#b3d0ee]"
          >
            {skill}
            <button
              type="button"
              className="ml-1 text-[#487ac1] hover:text-red-500"
              onClick={() => removeSkill(skill)}
              aria-label={`Remove ${skill}`}
            >
              <X size={18} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="border-2 border-[#888] rounded-md p-2 px-4 bg-white text-neutral-900 focus:outline-none focus:border-primary transition-colors duration-200 flex-grow"
          placeholder={
            skillList.length >= 10
              ? "Maximum 10 skills allowed"
              : "Add a skill and press Enter or Add"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={skillList.length >= 10}
        />
        <button
          type="button"
          className="bg-[#2B5A9E] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#487ac1] transition-colors"
          onClick={addSkill}
          disabled={skillList.length >= 10}
        >
          Add
        </button>
      </div>
    </div>
  );
}
