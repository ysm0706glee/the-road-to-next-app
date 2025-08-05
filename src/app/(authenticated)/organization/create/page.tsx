import { CardCompact } from "@/components/card-compact";
import OrganizationCreateForm from "@/features/organization/components/organization-create-form";

const OrganizationCreatePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center ">
      <CardCompact
        title="Create Organization"
        description="Create a new organization for your team"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default OrganizationCreatePage;
