import React from 'react';
import Select, { components } from 'react-select';
import { useField, useFormikContext } from 'formik';
import { ErrorMessage } from 'formik';
import { PlayIcon } from 'lucide-react';

export interface IOption {
  label: string;
  value: string | number;
}

interface IInputReactSelect {
  name: string;
  label: string;
  options: IOption[];
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  placeholder?: string;
  wrapperClassName?: string;
  isDisabled?: boolean;
}

const ReactSelect: React.FC<IInputReactSelect> = ({
  name,
  label,
  options,
  className = '',
  setSearch,
  labelClassName = '',
  required = false,
  placeholder = 'Select an option',
  wrapperClassName = '',
  isDisabled = false,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const customComponents = {
    DropdownIndicator: (props: any) => (
      <components.DropdownIndicator {...props}>
        <PlayIcon className="rotate-90" />
      </components.DropdownIndicator>
    ),
    IndicatorSeparator: () => null,
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${wrapperClassName}`}>
      <label className={`flex items-center gap-1 ${labelClassName}`} htmlFor={name}>
        <p className="typography-regular-small text-primary-900 shrink-0">{label}</p>
        {required && <p className="text-error">*</p>}
      </label>

      <div className={`relative`}>
        <Select
          id={name}
          name={name}
          value={options?.find(opt => opt.value === field.value) || null}
          onChange={option => setFieldValue(name, (option as IOption)?.value)}
          onInputChange={value => {
            setSearch?.(value);
          }}
          options={options}
          components={customComponents}
          placeholder={placeholder}
          isDisabled={isDisabled}
          classNamePrefix="react-select"
          className={`react-select-container ${className}`}
          styles={{
            control: base => ({
              ...base,
              padding: '6px',
              borderRadius: '0.5rem',
              borderColor: meta.touched && meta.error ? '#EF4444' : '#E5E7EB',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#3B82F6',
              },
              minHeight: '42px',
            }),
            placeholder: base => ({
              ...base,
              fontSize: '0.875rem',
              color: '#9CA3AF',
            }),
            singleValue: base => ({
              ...base,
              fontSize: '0.875rem',
              color: '#111827',
            }),
            option: base => ({
              ...base,
              fontSize: '0.875rem',
            }),
          }}
        />

        {/* Custom Dropdown Icon */}
        {/* <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
               <PlayIcon className="rotate-90" />
            </div> */}
      </div>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default ReactSelect;
