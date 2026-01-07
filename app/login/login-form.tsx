"use client";

import Button from "../ui/button";
import Form from "../ui/form";

export default function LoginForm() {
  const fields = [
    {
      type: "password",
      label: "Password",
      name: "name",
      placeholder: "",
    },
  ];

  return <Form fields={fields} />;
}
