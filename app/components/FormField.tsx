import { Description, Field, Input, Label } from "@headlessui/react";

export interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  description: string;
  borderColour?: "blue" | "orange" | "pink" | "green" | "red";
  required: boolean;
}

const borderColorMap = {
  blue: "focus:border-blue-500",
  orange: "focus:border-orange-500",
  pink: "focus:border-pink-500",
  green: "focus:border-green-500",
  red: "focus:border-red-500",
};

export default function FormField({
  label,
  type,
  name,
  description,
  borderColour = "orange",
  required = false,
}: FormFieldProps) {
  const borderColorClass = borderColorMap[borderColour];

  return (
    <Field className="flex flex-col gap-2 w-96 group">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex flex-row gap-8">
        <Input
          type={type}
          name={name}
          className={`border-0 border-b-3 border-gray-300 focus:outline-none ${borderColorClass} transition-all duration-300 bg-transparent rounded-none px-2 py-1 data-invalid:focus:border-red-500 data-invalid:border-red-500`}
          // Doesn't yet work. TODO: Fix annoying autofill styling.
          style={{
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
            WebkitTextFillColor: "inherit",
          }}
          required={required}
        />
        <div className="h-8">
          <Description className="hidden group-focus-within:block font-light text-xs dark:text-gray-300">
            {description}
          </Description>
        </div>
      </div>
    </Field>
  );
}
