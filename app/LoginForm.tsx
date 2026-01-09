"use client";

import { Button } from "@headlessui/react";
import { useActionState } from "react";

import FormField, { FormFieldProps } from "@/app/components/FormField";
import { loginUser } from "@/app/actions";

const initialState: {
  email: string;
  password: string;
  errors: string[];
  message: string;
} = {
  email: "",
  password: "",
  errors: [],
  message: "",
};

export default function LoginForm({ fields }: { fields: FormFieldProps[] }) {
  const [state, formAction, pending] = useActionState(loginUser, initialState);

  return (
    <form className="flex gap-8 flex-col" action={formAction}>
      {/* Display field-specific errors */}
      {state && state.errors && state.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <ul className="text-sm space-y-1">
            {state.errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          description={field.description}
          borderColour="blue"
          required={field.required}
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
