"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const upsertTicket = async (
  id: string | undefined,
  fromData: FormData
) => {
  const data = {
    title: fromData.get("title") as string,
    content: fromData.get("content") as string,
  };
  await prisma.ticket.upsert({
    where: {
      id: id || "",
    },
    update: data,
    create: data,
  });
  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketPath(id));
  }
};
