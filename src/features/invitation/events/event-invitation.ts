import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export type InvitationEventArgs = {
  data: {
    email: string;
    userId: string;
  };
};

export const invitationEvent = inngest.createFunction(
  { id: "invitation" },
  { event: "app/auth.sign-up" },
  async ({ event }) => {
    // FIXME:
    if (!("email" in event.data)) return;
    const { email, userId } = event.data;
    const invitations = await prisma.invitation.findMany({
      where: {
        email,
      },
    });

    await prisma.$transaction([
      prisma.invitation.deleteMany({
        where: {
          email,
        },
      }),

      prisma.membership.createMany({
        data: invitations.map((invitation) => ({
          organizationId: invitation.organizationId,
          userId: userId,
          membershipRole: "MEMBER",
          isActive: false,
        })),
      }),
    ]);
  }
);
