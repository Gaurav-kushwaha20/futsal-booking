import React from 'react';
import { ErrorMessage, useField } from 'formik';

interface IInputDate extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  wrapperClassName?: string;
}

const InputDate: React.FC<IInputDate> = ({
  name,
  label,
  className,
  labelClassName,
  required,
  wrapperClassName,
  ...props
}) => {
  const [field, meta] = useField(name);

  const getBorderClass = () => {
    if (meta.touched && meta.error) return 'border-error';
    return 'border-gray-100';
  };

  return (
    <div className={`flex flex-col gap-3 ${wrapperClassName}`}>
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p className="typography-regular-small text-primary-900">{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <div className="w-full relative">
        <input
          id={name}
          type="date"
          className={`w-full p-3 typography-regular-extra-small text-gray-700 rounded-lg border focus:outline-primary-500 ${getBorderClass()} ${className} [&::-webkit-calendar-picker-indicator]:opacity-0`}
          {...field}
          {...props}
        />

        {/* Custom Icon Placeholder */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M6 1.25V4.75M13 1.25V4.75"
              stroke="#2F234F"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.625 3L3.375 3C2.4085 3 1.625 3.7835 1.625 4.75L1.625 17C1.625 17.9665 2.4085 18.75 3.375 18.75H15.625C16.5915 18.75 17.375 17.9665 17.375 17V4.75C17.375 3.7835 16.5915 3 15.625 3Z"
              stroke="#2F234F"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.625 8.25L17.375 8.25"
              stroke="#2F234F"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default InputDate;
