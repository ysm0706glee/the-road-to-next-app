import EmailPasswordReset from "@/emails/password/email-password-reset";
import { resend } from "@/lib/resend";

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string
) => {
  return await resend.emails.send({
    from: "no-replay@app.takuma-blog.com",
    to: email,
    subject: "Password Reset from TicketBounty",
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />,
  });
};
