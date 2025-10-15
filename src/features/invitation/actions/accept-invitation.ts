"use server";

import { Invitation } from "@prisma/client";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { membershipsPath, signInPath } from "@/paths";
import { hashToken } from "@/utils/crypto";

export const acceptInvitation = async (tokenId: string) => {
  let invitation: Invitation | null = null;

  try {
    const tokenHash = hashToken(tokenId);

    invitation = await prisma.invitation.findUnique({
      where: { tokenHash },
    });

    if (!invitation) {
      return toActionState("ERROR", "Revoked or invalid verification token");
    }

    const user = await prisma.user.findUnique({
      where: { email: invitation.email },
    });

    if (user) {
      await prisma.$transaction([
        prisma.invitation.delete({
          where: { tokenHash },
        }),
        prisma.membership.create({
          data: {
            organizationId: invitation.organizationId,
            userId: user.id,
            membershipRole: "MEMBER",
            isActive: false,
          },
        }),
      ]);
    } else {
      // TODO: decide what to do when user doesn't exist (e.g. keep invitation, create pending membership, etc.)
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey("toast", "Invitation accepted");
  const { session } = await getAuth();

  if (session) {
    redirect(membershipsPath(invitation.organizationId));
  }

  redirect(signInPath());
};
