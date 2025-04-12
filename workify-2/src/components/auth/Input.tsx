import { useId } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface InputProps {
    ref : React.Ref<HTMLInputElement>;
    field: any;
    label: string;
    type?: string;
    disabled?: boolean;
}

const InputField:React.FC<InputProps> = ({
    ref,
    field,
    label,
    type='text',
    disabled = false,
}) => {

    const id = useId();

    return (
        <div className="w-full relative">
            <FormItem>
                <FormLabel
                    htmlFor={id}
                    className={`
                        absolute
                        text-lg
                        text-neutral-600
                        duration-150
                        transform
                        -translate-y-7
                        bg-white
                        px-1
                        top-4
                        left-4
                        z-10
                    `}
                >
                    {label}
                </FormLabel>
                <FormControl>
                <Input
                    ref={ref}
                    id={id}
                    type={type}
                    disabled={disabled}
                    placeholder=" "
                    {...field}
                    className={`
                        h-full
                        w-full
                        p-4
                        pt-4
                        bg-white
                        border-2
                        rounded-lg
                        outline-none
                        transition
                        diasbled:opacity-70
                        disabled:cursor-not-allowed
                        disabled:bg-gray-100
                        border-neutral-500
                        focus:border-[#2B5A9E]
                    `}
                />
                </FormControl>
                <FormMessage/>
            </FormItem>
        </div>
)}
export default InputField;