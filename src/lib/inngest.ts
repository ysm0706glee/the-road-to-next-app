import { EventSchemas, Inngest } from "inngest";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";
import { WelcomeEventArgs } from "@/features/password/events/event-welcome";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/welcome-email": WelcomeEventArgs;
};

export const inngest = new Inngest({
  id: "the-road-to-next",
  schemas: new EventSchemas().fromRecord<Events>(),
});
