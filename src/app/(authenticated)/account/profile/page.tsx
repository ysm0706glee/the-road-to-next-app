import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import EmailChangeForm from "@/features/emails/components/email-change-form";
import { AccountTabs } from "../_navigation/tabs";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All your profile information"
        tabs={<AccountTabs />}
      />
      <div className="flex-1 flex flex-col items-center ">
        <CardCompact
          title="Change email"
          description="Enter your new email."
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<EmailChangeForm />}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
