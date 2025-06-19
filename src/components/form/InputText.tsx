import React from "react";
import { ErrorMessage, useField } from "formik";

interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label: string;
   className?: string;
   labelClassName?: string;
}

const InputText: React.FC<IInputText> = ({
   name,
   label,
   labelClassName,
   className,
   ...props


}) => {
   const [field, meta] = useField(name);


   const getBorderClass = () => {
      if (meta.touched && meta.error) {
         return 'border-red-500';
      }
      if (meta.touched && !meta.error) {
         return 'border-gray-100';
      }
      return 'border-gray-200';
   };

   return (
      <div className={`w-full flex flex-col gap-2`}>
         <label className={`text-black ${labelClassName}`} htmlFor={name}>
            {label}
         </label>
         <input
            id={name}
            type="text"
            className={`w-full p-3 text-black rounded-lg border ${className} ${getBorderClass()}`}
            {...field}
            {...props}
         />
         <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
      </div >
   );
};

export default InputText