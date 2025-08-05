import { CardCompact } from "@/components/card-compact";
import OrganizationCreateForm from "@/features/organization/components/organization-create-form";

const OnboardingPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center ">
      <CardCompact
        title="Create Organization"
        description="Create an organization to get started"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default OnboardingPage;
