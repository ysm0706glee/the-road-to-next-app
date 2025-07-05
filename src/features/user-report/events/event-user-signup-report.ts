import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendEmailUserSignupReport } from "../emails/send-email-user-signup-report";

export const userSignupReportEvent = inngest.createFunction(
  { id: "user-signup-report" },
  { cron: "0 0 * * 1" },
  async () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const count = await prisma.user.count({
      where: {
        createdAt: {
          gt: oneWeekAgo,
        },
      },
    });
    await sendEmailUserSignupReport(count);
    return { count };
  }
);
