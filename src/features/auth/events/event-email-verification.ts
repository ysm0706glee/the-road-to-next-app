import { sendEmailVerification } from "@/features/emails/send-email.verification";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { generateEmailVerificationCode } from "../utils/generate-email-verification-code";

export type EmailVerificationEventArgs = {
  data: {
    userId: string;
  };
};

export const emailVerificationEvent = inngest.createFunction(
  { id: "email-verification" },
  { event: "app/auth.sign-up" },
  async ({ event }) => {
    const { userId } = event.data;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const verificationCode = await generateEmailVerificationCode(
      userId,
      user.email
    );
    const result = await sendEmailVerification(
      user.username,
      user.email,
      verificationCode
    );
    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }
    return { event, body: result };
  }
);
