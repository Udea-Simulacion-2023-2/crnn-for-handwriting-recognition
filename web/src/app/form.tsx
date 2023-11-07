"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/submit-button";
import { submit } from "@/app/actions";

export function Form() {
  const [state, action] = useFormState(submit, { writing: null });
  return (
    <form action={action}>
      <label htmlFor="image">Choose a handwriting picture:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
      />
      <SubmitButton />
      <p aria-live="polite">{state?.writing}</p>
    </form>
  );
}
