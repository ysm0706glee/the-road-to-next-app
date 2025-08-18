import {
  cloneElement,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { Form } from "@/components/form/form";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UseOrganizationEditDialogProps = {
  organizationId: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  trigger: React.ReactElement | ((isPending: boolean) => React.ReactElement);
  onSuccess?: (actionState: ActionState) => void;
};

const useOrganizationEditDialog = ({
  organizationId,
  action,
  trigger,
  onSuccess,
}: UseOrganizationEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE
  );

  const dialogTrigger = cloneElement(
    typeof trigger === "function" ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen((state) => !state),
    }
  );

  const toastRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading("Updating...");
    } else if (toastRef.current) {
      toast.dismiss();
    }
    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Organization Name</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide a new name for the organization.{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form action={formAction} actionState={actionState}>
          <input type="hidden" name="organizationId" value={organizationId} />
          <Input type="text" name="organizationName" required />
          <AlertDialogAction asChild>
            <Button type="submit">Confirm</Button>
          </AlertDialogAction>
        </Form>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useOrganizationEditDialog };
