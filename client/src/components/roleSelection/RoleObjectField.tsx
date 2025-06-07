import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function RoleObjectField({
    label,
    placeholder,
    value,
    options,
    onChange,
}: {
    label: string;
    placeholder: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-y-4 flex-grow">
        <label className="font-[500] text-xl ">{label}</label>
        <Select>
            <SelectTrigger className="w-full border-2 border-[#888] rounded-md p-5 bg-white text-neutral-900 focus:outline-none focus:border-primary transition-colors duration-200">
                <SelectValue placeholder={value || placeholder}/>
            </SelectTrigger>
            <SelectContent>
                {options.map((value) => (
                    <SelectItem key={value} value={value} onClick={() => onChange(value)}>
                        {value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}
