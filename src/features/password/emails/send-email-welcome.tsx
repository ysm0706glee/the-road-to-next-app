import WelcomeEmail from "@/emails/auth/email-welcome";
import { resend } from "@/lib/resend";

export const sendEmailWelcome = async (
  username: string,
  email: string,
  loginUrl: string
) => {
  return await resend.emails.send({
    from: "no-reply@app.takuma-blog.com",
    to: email,
    subject: "Welcome to TicketBounty",
    react: <WelcomeEmail toName={username} loginUrl={loginUrl} />,
  });
};
