"use client";

import { Button } from "@headlessui/react";
import { useActionState } from "react";

import FormField, { FormFieldProps } from "@/app/components/FormField";
import { loginUser } from "@/app/actions/auth";

export default function LoginForm({ fields }: { fields: FormFieldProps[] }) {
  const [state, formAction, pending] = useActionState(loginUser, undefined);

  return (
    <form className="flex gap-8 flex-col" action={formAction}>
      {state && state.message && <p className="text-md ">{state.message}</p>}
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          description={field.description}
          borderColour="blue"
          required={field.required}
          errors={state?.errors?.[field.name as keyof typeof state.errors]}
        />
      ))}
      <Button
        type="submit"
        className="data-hover:bg-blue-500/80 text-sm text-white w-32 px-4 py-1 bg-blue-600/70"
        disabled={pending}
      >
        Login
      </Button>
    </form>
  );
}
