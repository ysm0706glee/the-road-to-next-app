"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { emailChange } from "../actions/email-change";

const EmailChangeForm = () => {
  const [actionState, action] = useActionState(emailChange, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="email"
        name="new-email"
        placeholder="New Email"
        defaultValue={actionState.payload?.get("new-email") as string}
      />
      <FieldError actionState={actionState} name="new-email" />
      <SubmitButton label="Send Email" />
    </Form>
  );
};

export default EmailChangeForm;
