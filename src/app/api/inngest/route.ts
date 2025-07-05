import { serve } from "inngest/next";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { userSignupReportEvent } from "@/features/user-report/events/event-user-signup-report";
import { inngest } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [passwordResetEvent, userSignupReportEvent],
});
