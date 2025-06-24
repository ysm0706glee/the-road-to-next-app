"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { passwordChange } from "../actions/password-change";

const PasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    passwordChange,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="password"
        name="currentPassword"
        placeholder="Current password"
        defaultValue={actionState.payload?.get("currentPassword") as string}
      />
      <FieldError actionState={actionState} name="currentPassword" />
      <Input
        type="password"
        name="newPassword"
        placeholder="New password"
        defaultValue={actionState.payload?.get("newPassword") as string}
      />
      <FieldError actionState={actionState} name="newPassword" />
      <Input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm new password"
        defaultValue={actionState.payload?.get("confirmNewPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmNewPassword" />
      <SubmitButton label="Change Password" />
    </Form>
  );
};

export default PasswordChangeForm;
