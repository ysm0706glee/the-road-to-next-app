import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { passwordForgotPath, signUpPath } from "@/paths";

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <CardCompact
        title="Sign In"
        description="Create an account to get started"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignUpForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignUpPage;
