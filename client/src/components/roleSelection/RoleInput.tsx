
export default function RoleInput({
    label,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-y-4 flex-grow">
      <label className="font-[500] text-xl ">{label}</label>
      <input
        type="text"
        className="border-2 border-[#888] rounded-md p-2 px-4 bg-white text-neutral-900 focus:outline-none focus:border-primary transition-colors duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
