import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { MembershipList } from "@/features/membership/components/membership-list";
import { getOrganizationById } from "@/features/organization/queries/get-organization-by-id";
import { OrganizationBreadcrumbs } from "../_navigation/tabs";

type MembershipsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
        tabs={<OrganizationBreadcrumbs organizationName={organization?.name} />}
      />
      <Suspense fallback={<Spinner />}>
        <MembershipList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
