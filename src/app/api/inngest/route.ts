import { serve } from "inngest/next";
import { emailVerificationEvent } from "@/features/auth/events/event-email-verification";
import { emailChangeEvent } from "@/features/emails/events/event-email-change";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { WelcomeEvent } from "@/features/password/events/event-welcome";
import { inngest } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    passwordResetEvent,
    WelcomeEvent,
    emailVerificationEvent,
    emailChangeEvent,
  ],
});
