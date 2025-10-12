import { prisma } from "@/lib/prisma";

export const getOrganizationById = async (organizationId: string) => {
  return await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
};
