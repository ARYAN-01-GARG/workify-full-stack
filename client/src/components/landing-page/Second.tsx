import { useNavigate } from "react-router-dom";

export default function Second() {
    const navigate = useNavigate();
  return (
    <section className="lg:flex items-center gap-10 justify-center w-full hidden">
        <img src="/images/landing-page/becomeCandidate.png" alt="image" className="max-w-[43%] cursor-pointer transition hover:scale-105" onClick={() => navigate('/auth/register')}/>
        <img src="/images/landing-page/becomeRecruiter.png" alt="image" width={650} className="max-w-[45%] cursor-pointer transition hover:scale-105" onClick={() => navigate('/auth/register')}/>
    </section>
  )
}
