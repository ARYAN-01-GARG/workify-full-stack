import { useState, useRef, useEffect } from "react";
import AuthModal from "@/components/auth/AuthModal";
import InputOTP from "@/components/auth/InputOtp";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { VerifyOTP, resendOtp } from "@/store/features/auth/authSlice";
import { selectLoading, selectUser } from "@/store/features/userSlice";
import { Button } from "@/components/ui/button";
import { selectOtpActivation, setOtpActivation } from "@/store/features/middlewareSlice";

const VerifyOTPPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [timer, setTimer] = useState<number>(29);
    const [resendLoading , setResendLoading] = useState<boolean>(false);
    const [showResend, setShowResend] = useState<boolean>(false);
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectLoading);
    const sendBy = useSelector(selectOtpActivation);



    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const handleOTPChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otpRefs.length - 1) {
            otpRefs[index + 1].current?.focus();
        } else if (!value && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (index === otpRefs.length - 1) {
                handleSubmit(e);
            } else if (index < otpRefs.length - 1) {
                otpRefs[index + 1].current?.focus();
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLFormElement>) => {
        const pasteData = e.clipboardData.getData('text');
        if (pasteData.length === otp.length) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            otpRefs[otpRefs.length - 1].current?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        const { email } = user;

        try{
            dispatch(VerifyOTP({ email , otp: otpValue})).then( (res) => {
                if( res.meta.requestStatus === 'fulfilled' ) dispatch(setOtpActivation(''));
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        try{
            dispatch(resendOtp(user.email)).then( ( res ) => {
                if( res.meta.requestStatus === 'fulfilled' ) {
                    setTimer(29);
                    setShowResend(false);
                }
            })
        } catch (error) {
            console.log(error);
        } finally{
            setResendLoading(false);
        }
    };

    const footer = (
        <p className="text-lg font-medium -mt-3">
            Didn't receive the code?{" "}
            {showResend ? (
                <button className={`text-lg text-[#2B5A9E] font-medium`} onClick={handleResend}>
                    Resend Code
                </button>
            ) : (
                <span className="text-lg text-[#4b7cc1]">Resend in {timer}s</span>
            )}
        </p>
    );

    useEffect(() => {
        otpRefs[0].current?.focus();
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setShowResend(true);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    return (
        <>
            <AuthModal
                backURL={sendBy}
                disabled={isLoading || resendLoading}
                title="Enter the code"
                subTitlte={`Enter the OTP code we have sent to ${user.email}`}
                footer={footer}
            >
                <form className="flex flex-col items-center justify-around gap-y-4" onSubmit={handleSubmit} onPaste={handlePaste}>
                    <div className="flex items-center justify-around gap-2">
                        {otpRefs.map((ref, index) => (
                            <InputOTP
                                key={index}
                                ref={ref}
                                value={otp[index]}
                                onChange={(value : string) => handleOTPChange(value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                error={false}
                            />
                        ))}
                    </div>
                    <Button
                        type='submit'
                        className='mt-6 w-full text-lg font-semibold py-6 rounded-lg'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifing..' : 'Verify OTP'}
                    </Button>
                </form>
            </AuthModal>
        </>
    );
};

export default VerifyOTPPage;