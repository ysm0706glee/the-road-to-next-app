import EmailUserSignupReport from "@/emails/user-report/email-user-signup-report";
import { resend } from "@/lib/resend";

export const sendEmailUserSignupReport = async (count: number) => {
  return await resend.emails.send({
    from: "no-replay@app.takuma-blog.com",
    to: "ysm0706glee@gmail.com",
    subject: "📊 Weekly User Signup Report",
    react: <EmailUserSignupReport signupCount={count} />,
  });
};
