"use server";

import { Invitation } from "@prisma/client";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
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
      return {
        status: "ERROR",
        message: "Revoked or invalid verification token",
      };
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
      await prisma.invitation.update({
        where: { tokenHash },
        data: {
          status: "ACCEPTED_WITHOUT_ACCOUNT",
        },
      });
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }

  await setCookieByKey("toast", "Invitation accepted");
  const { session } = await getAuth();

  if (session) {
    redirect(membershipsPath(invitation.organizationId));
  }

  redirect(signInPath());
};
