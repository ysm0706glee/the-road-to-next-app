"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  fromData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: fromData.get("title"),
      content: fromData.get("content"),
    });
    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, fromData);
  }
  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketPath(id));
  }
  return toActionState("SUCCESS", "Ticket created");
};
