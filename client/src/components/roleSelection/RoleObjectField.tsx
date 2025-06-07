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
    onChange: ( val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-y-4 flex-grow">
        <label className="font-[500] text-xl ">{label}</label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full border-2 border-[#888] rounded-md p-5 bg-white text-neutral-900 focus:outline-none focus:border-primary transition-colors duration-200">
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
                {options.map((optionValue) => (
                    <SelectItem key={optionValue} value={optionValue}>
                        {optionValue}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}
