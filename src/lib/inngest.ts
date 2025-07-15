import { EventSchemas, Inngest } from "inngest";
import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { EmailChangeEventArgs } from "@/features/emails/events/event-email-change";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.sign-up": EmailVerificationEventArgs;
  "app/email.email-change": EmailChangeEventArgs;
};

export const inngest = new Inngest({
  id: "the-road-to-next",
  schemas: new EventSchemas().fromRecord<Events>(),
});
