"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  fromData: FormData
) => {
  const { user, activeOrganization } = await getAuthOrRedirect();
  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }
    const data = upsertTicketSchema.parse({
      title: fromData.get("title"),
      content: fromData.get("content"),
      deadline: fromData.get("deadline"),
      bounty: fromData.get("bounty"),
    });
    const dbData = {
      ...data,
      userId: user.id,
      bounty: toCent(data.bounty),
    };
    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: dbData,
      create: { ...dbData, organizationId: activeOrganization!.id },
    });
  } catch (error) {
    return fromErrorToActionState(error, fromData);
  }
  revalidatePath(ticketsPath());
  if (id) {
    setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }
  return toActionState("SUCCESS", "Ticket created");
};
