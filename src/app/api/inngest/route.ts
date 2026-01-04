import { serve } from "inngest/next";
import { attachmentDeletedEvent } from "@/features/attachments/events/event-attachment-deleted";
import { emailVerificationEvent } from "@/features/auth/events/event-email-verification";
import { emailChangeEvent } from "@/features/emails/events/event-email-change";
import { invitationCreatedEvent } from "@/features/invitation/events/event-invitation-created";
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
    invitationCreatedEvent,
    attachmentDeletedEvent,
  ],
});
