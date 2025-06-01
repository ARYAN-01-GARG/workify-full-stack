import * as z from "zod";
import {
    Form,
    FormField,
} from "@/components/ui/form";
import InputField from "@/components/auth/Input";
import AuthModal from "@/components/auth/AuthModal";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/schemas/LoginSchema";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectLoading, selectUser } from "@/store/features/userSlice";


const LoginPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(selectLoading);
    const user = useSelector(selectUser);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: user.email,
            password: "",
        },
    });

    const handleSubmit = async () => {
        try {
            const userData = form.getValues();
            await dispatch(loginUser(userData))
        } catch (err) {
            console.log(err);
        }
    };

    const footer = (
        <p className="text-sm -mt-7">
            Don't have an account?{" "}
            <Link to="/auth/register" className={`text-[.95rem] text-[#2B5A9E] hover:underline font-semibold ${isLoading ? 'opacity-70' : ''}`}>
                Sign Up
            </Link>
        </p>
    );

    return (
        <>
            <AuthModal
                disabled={false}
                backURL="/"
                title="Login"
                subTitlte="To explore opportunities and take the next step in your career"
                footer={footer}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="w-full flex flex-col gap-4"
                    >
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <InputField
                                        ref={emailRef}
                                        type="email"
                                        field={field}
                                        label="Email"
                                        disabled={isLoading}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <InputField
                                        ref={passwordRef} // Pass ref to InputField
                                        field={field}
                                        label="Password"
                                        type="password"
                                        disabled={isLoading}
                                    />
                                )}
                            />
                            <div className="flex justify-between items-center font-medium">
                                <div className="flex items-center gap-1">
                                    <input type="checkbox" id="remember" className="bg-neutral-800 outline-none border-none" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <div>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="hover:underline cursor:pointer"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="mt-6 w-full text-lg font-semibold py-6 rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logining...' : 'Login'}
                        </Button>
                    </form>
                </Form>
            </AuthModal>
        </>
    );
};

export default LoginPage;