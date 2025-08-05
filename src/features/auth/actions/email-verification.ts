"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { consumeValidEmailVerificationToken } from "../utils/consume-valid-email-verification-token";
import { setSessionCookie } from "../utils/session-cookie";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const { code } = emailVerificationSchema.parse({
      code: formData.get("code"),
    });

    const verifiedEmail = await consumeValidEmailVerificationToken(
      user.id,
      // user.email,
      code
    );

    if (!verifiedEmail) {
      return toActionState("ERROR", "Invalid or expired code");
    }

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { email: verifiedEmail, emailVerified: true },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey("toast", "Email verified");
  redirect(ticketsPath());
};
