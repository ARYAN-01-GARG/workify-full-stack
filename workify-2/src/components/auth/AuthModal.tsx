import { useNavigate } from "react-router-dom";

interface AuthModalProps {
    title: string;
    subTitlte: string;
    children: React.ReactNode;
    footer: React.ReactNode;
    disabled?: boolean;
    backURL?: string;
}

const AuthModal:React.FC<AuthModalProps> = ({
    title,
    subTitlte,
    children,
    footer,
    disabled = false,
    backURL='/'
}) => {

    const navigate = useNavigate();

  return (
     <div className="relative h-full w-full p-8 flex justify-center items-center">
      <div
        className="flex flex-col justify-center items-center gap-12 max-w-[385px]">
          <div className={`hidden lg:block absolute top-5 right-20 text-4xl ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <button disabled={disabled} onClick={() => navigate(backURL)}>←</button>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
            <h2 className="text-[.95rem] font-medium pl-1 pr-4">{subTitlte}</h2>
          </div>
          <div className="w-full">
            {children}
          </div>
          <div>
            {footer}
          </div>
      </div>
    </div>
  )
}

export default AuthModal