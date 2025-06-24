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
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { hashPassword, verifyPasswordHash } from "../utils/hash-and-verify";

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(6).max(191),
    newPassword: z.string().min(6).max(191),
    confirmNewPassword: z.string().min(6).max(191),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const auth = await getAuthOrRedirect();
  try {
    const { currentPassword, newPassword } = passwordChangeSchema.parse(
      Object.fromEntries(formData)
    );
    const user = await prisma.user.findUnique({
      where: { email: auth.user.email },
    });
    if (!user) {
      // we should never reach this return statement
      // but it's here just in case
      return toActionState("ERROR", "Invalid request", formData);
    }
    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      currentPassword
    );
    if (!validPassword) {
      return toActionState("ERROR", "Incorrect password", formData);
    }
    const newPasswordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  await setCookieByKey("toast", "Password successfully changed");
  return redirect(ticketsPath());
};
