"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { emailVerification } from "../actions/email-verification";

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <InputOTP
        maxLength={8}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        name="code"
        defaultValue={actionState.payload?.get("code") as string}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
      <FieldError actionState={actionState} name="code" />
      <SubmitButton label="Verify Email" />
    </Form>
  );
};

export default EmailVerificationForm;
