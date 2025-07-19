"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { emailVerificationPath } from "@/paths";

const emailChangeSchema = z.object({
  newEmail: z.string().min(1, { message: "Is required" }).max(191).email(),
});

export const emailChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const auth = await getAuthOrRedirect({
    checkEmailVerified: false,
  });
  try {
    const { newEmail } = emailChangeSchema.parse({
      newEmail: formData.get("new-email"),
    });
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });
    if (existingUser) {
      return toActionState("ERROR", "This email is already in use.", formData);
    }
    await prisma.user.update({
      where: { id: auth.user.id },
      data: {
        emailVerified: false,
      },
    });
    await inngest.send({
      name: "app/email.email-change",
      data: {
        userId: auth.user.id,
        newEmail,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  await setCookieByKey("toast", "Check your email for a verification code");
  redirect(emailVerificationPath());
};
