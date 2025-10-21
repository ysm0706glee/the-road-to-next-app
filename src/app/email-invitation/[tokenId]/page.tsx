import { CardCompact } from "@/components/card-compact";
import { acceptInvitation } from "@/features/invitation/actions/accept-invitation";

type EmailInvitationPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const EmailInvitationPage = async ({ params }: EmailInvitationPageProps) => {
  const { tokenId } = await params;

  const result = await acceptInvitation(tokenId);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Invitation Error"
        description={
          result.status === "ERROR"
            ? result.message
            : "Failed to accept invitation. Please contact support."
        }
        className="w-full max-w-[420px] animate-fade-from-top"
        content={null}
      />
    </div>
  );
};

export default EmailInvitationPage;
