"use client";

import React, { useState, useMemo } from "react";

interface FormField {
  type: string;
  name: string;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface FormProps {
  fields: FormField[];
  themeColor?: string;
}

interface ShowPasswordState {
  [key: string]: boolean;
}

interface ThemeClasses {
  input: string;
  label: string;
  button: string;
  checkboxRadio: string;
  icon: string;
}

const Form = ({ fields, themeColor = "blue" }: FormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string
  ): void => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = (name: string): void => {
    setShowPassword((prev: ShowPasswordState) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const themeClasses: ThemeClasses = useMemo(
    () => ({
      input: `w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`,
      label: "block text-gray-700 font-semibold mb-2",
      button: `w-full px-4 py-2 bg-${themeColor}-500 text-white rounded hover:bg-${themeColor}-600 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`,
      checkboxRadio: `form-${themeColor}`,
      icon: `text-${themeColor}-600 cursor-pointer`,
    }),
    [themeColor]
  );

  const renderInput = (field: FormField): React.ReactNode => {
    const { type, name, options, placeholder } = field;

    switch (type) {
      case "text":
      case "number":
      case "email":
      case "date":
        return (
          <div className="mb-6">
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={(formData[name as keyof typeof formData] as string) || ""}
              onChange={(e) => handleChange(e, name)}
              className={themeClasses.input}
            />
          </div>
        );

      case "password":
        return (
          <div className="mb-6">
            <div className="relative">
              <input
                type={showPassword[name] ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={
                  (formData[name as keyof typeof formData] as string) || ""
                }
                onChange={(e) => handleChange(e, name)}
                className={themeClasses.input}
              />
              <span
                onClick={() => togglePasswordVisibility(name)}
                className={`absolute inset-y-0 right-0 flex items-center pr-3 ${themeClasses.icon}`}
              >
                {showPassword[name] ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
        );

      case "radio":
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              {options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={
                      formData[name as keyof typeof formData] === option.value
                    }
                    onChange={(e) => handleChange(e, name)}
                    className={themeClasses.checkboxRadio}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              {options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={option.value}
                    checked={
                      (
                        formData[name as keyof typeof formData] as string[]
                      )?.includes(option.value) || false
                    }
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        [name]: (formData[
                          name as keyof typeof formData
                        ] as string[])
                          ? (
                              formData[
                                name as keyof typeof formData
                              ] as string[]
                            ).includes(option.value)
                            ? (
                                formData[
                                  name as keyof typeof formData
                                ] as string[]
                              ).filter((val) => val !== option.value)
                            : [
                                ...(formData[
                                  name as keyof typeof formData
                                ] as string[]),
                                option.value,
                              ]
                          : [option.value],
                      }))
                    }
                    className={themeClasses.checkboxRadio}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "select":
        return (
          <div className="mb-6">
            <select
              name={name}
              value={(formData[name as keyof typeof formData] as string) || ""}
              onChange={(e) => handleChange(e, name)}
              className={themeClasses.input}
            >
              <option value="">Select {placeholder}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex font-sans items-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white mx-4">
      <form className="w-full max-w-lg mx-auto p-4 pt-8 drop-shadow-sm drop-shadow-white/20 bg-white dark:bg-gray-800">
        {/* <h2 className="text-2xl font-bold text-center mb-6"></h2> */}
        {fields.map((field) => (
          <div key={field.name}>{renderInput(field)}</div>
        ))}
        <button type="submit" className={themeClasses.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
