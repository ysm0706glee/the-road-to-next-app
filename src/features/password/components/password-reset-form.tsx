"use client";

import { useActionState, useState } from "react";
import zxcvbn from "zxcvbn";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { passwordReset } from "../actions/password-reset";

type PasswordResetFormProps = {
  tokenId: string;
};

const PasswordResetForm = ({ tokenId }: PasswordResetFormProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    EMPTY_ACTION_STATE
  );

  const [password, setPassword] = useState(
    (actionState.payload?.get("password") as string) || ""
  );

  const strength = zxcvbn(password).score * 25;

  const feedback = zxcvbn(password).feedback;

  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get("password") as string}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Progress value={strength} />
      {feedback.warning && <p>{feedback.warning}</p>}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Reset Password" />
    </Form>
  );
};

export default PasswordResetForm;
