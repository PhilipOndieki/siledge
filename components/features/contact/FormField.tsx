import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
};

type InputFieldProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
    as?: "input";
  };

type TextareaFieldProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
    as: "textarea";
  };

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  function FormField(props, ref) {
    const { id, label, error, required = true, as = "input", className, ...rest } = props;
    const describedBy = error ? `${id}-error` : undefined;
    const fieldClass = cn(
      "w-full rounded-md border border-siledge-blue/20 bg-white px-4 py-2.5 text-siledge-ink placeholder:text-siledge-slate/50 focus-visible:outline-2 focus-visible:outline-siledge-blueBright",
      error && "border-red-400",
      className,
    );

    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-siledge-ink">
          {label}
          {required ? null : <span className="text-siledge-slate"> (optional)</span>}
        </label>
        {as === "textarea" ? (
          <textarea
            id={id}
            rows={5}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={fieldClass}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={fieldClass}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

export default FormField;
