import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { InvitationList } from "@/features/invitation/components/invitation-list";
import { getOrganizationById } from "@/features/organization/queries/get-organization-by-id";
import { OrganizationBreadcrumbs } from "../_navigation/tabs";

type InvitationsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const InvitationsPage = async ({ params }: InvitationsPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Invitations"
        description="Manages your organization's invitations"
        tabs={<OrganizationBreadcrumbs organizationName={organization?.name} />}
      />

      <Suspense fallback={<Spinner />}>
        <InvitationList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
