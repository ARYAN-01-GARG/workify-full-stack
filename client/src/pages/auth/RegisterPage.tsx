import * as z from "zod";
import {
    Form,
    FormField,
} from "@/components/ui/form";
import InputField from "@/components/auth/Input";
import AuthModal from "@/components/auth/AuthModal";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectUser } from "@/store/features/userSlice";
import { AppDispatch } from "@/store/store";
import { registerUser } from "@/store/features/auth/authSlice";


const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectLoading);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            password: "",
        },
    });

  const handleSubmit = async  () => {
    try{
      const userData = form.getValues();
      dispatch(registerUser(userData)).then((res) => {
        if( res.meta.requestStatus === 'fulfilled' ) navigate('/auth/verify-otp')
      })
    } catch (err) {
      console.log(err);
    }
  };

  const footer = (
    <p className="text-sm -mt-7">
      Already have an account?{" "}
      <Link to="/auth/login" className={`text-[.95rem] text-[#2B5A9E] font-semibold ${isLoading ? 'opacity-70' : ''}`}>
        Log in
      </Link>
    </p>
  );

  return (
    <>
      <AuthModal
        disabled={isLoading}
        backURL="/"
        title="Create Your Account"
        subTitlte="Join the Workify community to find your ideal job fit."
        footer={footer}
      >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
        >
             <div className='space-y-6'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field} ) => (
                        <InputField
                            disabled={isLoading}
                            ref={nameRef}
                            field={field}
                            label="Name"
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field} ) => (
                        <InputField
                            disabled={isLoading}
                            ref={emailRef}
                            type="email"
                            field={field}
                            label="Email"
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field} ) => (
                        <InputField
                            disabled={isLoading}
                            ref={passwordRef}
                            field={field}
                            label="Password"
                            type="password"
                        />
                    )}
                />
             </div>
             <Button
              type='submit'
              className='mt-6 w-full text-lg font-semibold py-6 rounded-lg'
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create an account'}
            </Button>
            </form>
        </Form>
      </AuthModal>
    </>
  );
};

export default RegisterPage;