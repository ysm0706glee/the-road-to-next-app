import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendEmailWelcome } from "../emails/send-email-welcome";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";

export type WelcomeEventArgs = {
  data: {
    userId: string;
  };
};

export const WelcomeEvent = inngest.createFunction(
  { id: "welcome" },
  { event: "app/auth.sign-up" },
  async ({ event, step }) => {
    await step.sleep("wait-5-minutes", "5 minutes");
    const { userId } = event.data;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const passwordResetLink = await generatePasswordResetLink(user.id);
    const result = await sendEmailWelcome(
      user.username,
      user.email,
      passwordResetLink
    );
    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }
    return { event, body: result };
  }
);
