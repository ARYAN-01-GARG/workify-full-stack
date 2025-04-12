import AuthModal from "@/components/auth/AuthModal";
// import Input from "@/components/auth/Input";
// import { useRef } from "react";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormField,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import InputField from "@/components/auth/Input";
import { Button } from "@/components/ui/button";


const RegisterPage = () => {

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

  const handleSubmit = () => {
    try{
    //   dispatch(registerUser({
    //     name: name,
    //     contact: contact,
    //     password: password
    //   }))
    //   .then((res) => {
    //     if(res.type === 'auth/registerUser/fulfilled'){
    //     dispatch(setIsAllowed(true));
    //     navigate('/auth/verify');
    //     }
    //   });
    console.log('Registering user')
    } catch (err) {
      console.log(err);
    }
  };
  const isLoading = false;
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef?: React.RefObject<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       if (nextRef) {
//         nextRef.current?.focus();
//       } else {
//         handleSubmit(e as unknown as React.FormEvent);
//       }
//     }
//   };

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
        disabled={false}
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
                            ref={passwordRef}
                            field={field}
                            label="Password"
                        />
                    )}
                />
             </div>
             <Button
              type='submit'
              className='mt-6 w-full text-lg font-semibold py-6 rounded-lg'
            >
              Create an account
            </Button>
            </form>
        </Form>
      </AuthModal>
    </>
  );
};

export default RegisterPage;