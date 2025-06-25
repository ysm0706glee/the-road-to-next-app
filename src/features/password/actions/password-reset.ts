"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { hashToken } from "@/utils/crypto";
import { hashPassword } from "../utils/hash-and-verify";

const passwordResetSchema = z
  .object({
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { password } = passwordResetSchema.parse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    const tokenHash = hashToken(tokenId);
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });
    if (passwordResetToken) {
      await prisma.passwordResetToken.delete({
        where: { tokenHash },
      });
    }
    if (
      !passwordResetToken ||
      Date.now() > passwordResetToken.expiresAt.getTime()
    ) {
      return toActionState(
        "ERROR",
        "Expired or invalid verification token",
        formData
      );
    }
    await prisma.session.deleteMany({
      where: {
        userId: passwordResetToken.userId,
      },
    });
    const passwordHash = await hashPassword(password);
    await prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: { passwordHash },
    });
    // Create a new session for the user
    const session = await lucia.createSession(passwordResetToken.userId, {});
    // Set the authentication cookie
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  await setCookieByKey(
    "toast",
    "Your password has been reset and you’re now signed in."
  );
  // Redirect the user directly to their dashboard instead of the sign-in page
  return redirect(ticketsPath());
};
