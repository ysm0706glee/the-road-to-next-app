import { generateEmailVerificationCode } from "@/features/auth/utils/generate-email-verification-code";
import { sendEmailVerification } from "@/features/emails/send-email.verification";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export type EmailChangeEventArgs = {
  data: {
    userId: string;
    newEmail: string;
  };
};

export const emailChangeEvent = inngest.createFunction(
  { id: "email-change" },
  { event: "app/email.email-change" },
  async ({ event }) => {
    const { userId, newEmail } = event.data;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const verificationCode = await generateEmailVerificationCode(
      userId,
      newEmail
    );
    const result = await sendEmailVerification(
      user.username,
      newEmail,
      verificationCode
    );
    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }
    return { event, body: result };
  }
);
