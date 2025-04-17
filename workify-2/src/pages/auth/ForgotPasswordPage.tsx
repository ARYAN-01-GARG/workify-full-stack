import * as z from "zod";
import {
    Form,
    FormField,
} from "@/components/ui/form";
import InputField from "@/components/auth/Input";
import AuthModal from "@/components/auth/AuthModal";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { useSelector } from "react-redux";
import { selectLoading, selectUser } from "@/store/features/userSlice";


const ForgotPasswordPage = () => {

    // const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectLoading);
    const emailRef = useRef(null);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: user.email,
        },
    });

  const handleSubmit = async  () => {
    try{
      const userData = form.getValues();
      console.log(userData);
    //   await dispatch(registerUser(userData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AuthModal
        disabled={isLoading}
        backURL="/auth/login"
        title="Forgot Password"
        subTitlte="Enter your registered email or phone number"
        footer={<></>}
      >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
        >
             <div className='space-y-6'>
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
             </div>
             <Button
              type='submit'
              className='mt-6 w-full text-lg font-semibold py-6 rounded-lg'
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Get OTP'}
            </Button>
            </form>
        </Form>
      </AuthModal>
    </>
  );
};

export default ForgotPasswordPage;