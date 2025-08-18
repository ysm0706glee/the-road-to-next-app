"use client";

import { LucideLoaderCircle, LucidePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { editOrganization } from "../actions/edit-organization";
import { useOrganizationEditDialog } from "./organization-edit-dialog";

type OrganizationEditButtonProps = {
  organizationId: string;
};

const OrganizationEditButton = ({
  organizationId,
}: OrganizationEditButtonProps) => {
  const router = useRouter();

  const [editButton, editDialog] = useOrganizationEditDialog({
    organizationId,
    action: editOrganization,
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="destructive" size="icon">
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="icon">
          <LucidePen className="w-4 h-4" />
        </Button>
      ),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <>
      {editDialog}
      {editButton}
    </>
  );
};

export { OrganizationEditButton };
