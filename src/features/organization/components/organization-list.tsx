import { format } from "date-fns";
import { getOrganizationByUser } from "../queries/get-organization-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationByUser();

  return (
    <div>
      {organizations.map((organization) => (
        <div key={organization.id}>
          <h3>Name: {organization.name}</h3>
          <div>
            Joined At:{" "}
            {format(
              organization.membershipByUser.joinedAt,
              "yyyy-MM-dd, HH:mm"
            )}
          </div>
          <div>Members: {organization._count.memberships}</div>
        </div>
      ))}
    </div>
  );
};

export { OrganizationList };
