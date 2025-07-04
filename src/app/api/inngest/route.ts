import { serve } from "inngest/next";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { WelcomeEvent } from "@/features/password/events/event-welcome";
import { inngest } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [passwordResetEvent, WelcomeEvent],
});
