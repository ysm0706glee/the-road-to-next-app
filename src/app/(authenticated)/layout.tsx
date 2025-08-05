import { Footer } from "@/components/footer";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getActiveOrganizationByUser } from "@/features/organization/queries/get-active-organization-by-user";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();
  const activeOrganization = await getActiveOrganizationByUser();

  return (
    <>
      {children}
      {activeOrganization ? (
        <Footer activeOrganizationName={activeOrganization.name} />
      ) : null}
    </>
  );
}
