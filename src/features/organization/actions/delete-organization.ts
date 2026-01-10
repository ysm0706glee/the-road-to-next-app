"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

export const deleteOrganization = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);

  try {
    const organizations = await getOrganizationsByUser();

    const canDelete = organizations.some(
      (organization) => organization.id === organizationId
    );

    if (!canDelete) {
      return toActionState("ERROR", "Not a member of this organization");
    }

    await prisma.organization.delete({ where: { id: organizationId } });

    const attachments = await prisma.attachment.findMany({
      where: {
        ticket: {
          organizationId,
        },
      },
      include: {
        ticket: true,
      },
    });

    for (const attachment of attachments) {
      await inngest.send({
        name: "app/attachment.deleted",
        data: {
          organizationId: attachment.ticket.organizationId,
          ticketId: attachment.ticketId,
          fileName: attachment.name,
          attachmentId: attachment.id,
        },
      });
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("SUCCESS", "Organization deleted");
};
