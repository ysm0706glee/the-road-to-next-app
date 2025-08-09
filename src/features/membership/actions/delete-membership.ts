"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { getMemberships } from "../queries/get-memberships";

export const deleteMembership = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const auth = await getAuthOrRedirect();

  const memberships = await getMemberships(organizationId);

  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership) {
    return toActionState(
      "ERROR",
      "You cannot delete the last membership of an organization"
    );
  }

  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  const isSelfDeletion = userId === auth.user.id;

  return isSelfDeletion
    ? toActionState("SUCCESS", "Leaving organization...")
    : toActionState("SUCCESS", "Deleting member...");
};
