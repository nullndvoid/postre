import { FormFieldProps } from "./components/FormField";
import LoginForm from "./LoginForm";

export default function Home() {
  const fields: FormFieldProps[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      description:
        "Enter your email address to log in. If you are doing initial setup, the credentials can be found on your console.",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      description:
        "If you are doing initial setup, the credentials will be on your console. Forgot your password? Just click the link next to the Login button.",
      required: true,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-24 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl">Login</h1>
        <LoginForm fields={fields} />
      </div>
    </div>
  );
}
