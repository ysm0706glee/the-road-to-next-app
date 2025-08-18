"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";

export const editOrganization = async (
  _prevState: ActionState,
  formData: FormData
) => {
  const organizationId = formData.get("organizationId") as string;
  const organizationName = formData.get("organizationName") as string;

  await getAdminOrRedirect(organizationId);

  try {
    await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        name: organizationName,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("SUCCESS", "Organization updated");
};
