import { EventSchemas, Inngest } from "inngest";
import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { EmailChangeEventArgs } from "@/features/emails/events/event-email-change";
import { InvitationCreateEventArgs } from "@/features/invitation/events/event-invitation-created";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";
import { WelcomeEventArgs } from "@/features/password/events/event-welcome";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/welcome-email": WelcomeEventArgs;
  "app/auth.sign-up": EmailVerificationEventArgs;
  "app/email.email-change": EmailChangeEventArgs;
  "app/invitation.created": InvitationCreateEventArgs;
};

export const inngest = new Inngest({
  id: "the-road-to-next",
  schemas: new EventSchemas().fromRecord<Events>(),
});
