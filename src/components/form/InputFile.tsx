import { useField, useFormikContext } from 'formik';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

interface InputFileProps {
   label: string;
   name: string;
   styles?: string;
   inputstyles?: string;
   accept?: string;
   previewFieldSuffix?: string;
   required?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
   label,
   styles,
   inputstyles,
   accept = 'image/*',
   name,
   previewFieldSuffix = 'Preview',
   required,
}) => {
   const [field, meta] = useField(name);
   const previewFieldName = `${name}${previewFieldSuffix}`;
   const [previewField, , previewHelpers] = useField(previewFieldName);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const { setFieldValue } = useFormikContext();

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
         setFieldValue(name, file);

         if (previewField.value) {
            URL.revokeObjectURL(previewField.value);
         }

         const objectUrl = URL.createObjectURL(file);
         previewHelpers.setValue(objectUrl);
      }
   };

   useEffect(() => {
      if (field.value && !previewField.value) {
         if (typeof field.value === 'string') {
            previewHelpers.setValue(field.value);
         } else if (field.value instanceof File) {
            const objectUrl = URL.createObjectURL(field.value);
            previewHelpers.setValue(objectUrl);
         }
      }

      return () => {
         if (previewField.value && typeof previewField.value === 'string') {
            URL.revokeObjectURL(previewField.value);
         }
      };
   }, [field.value, previewField.value, previewHelpers]);

   return (
      <div>
         <div className={`${styles} flex flex-col gap-1 mb-3`}>
            <label className="flex items-center gap-1" htmlFor={name}>
               <p className="typography-regular-small text-primary-900">{label}</p>
               {required && <p className="text-error">*</p>}
            </label>
            <input
               id={name}
               ref={fileInputRef}
               type="file"
               accept={accept}
               onChange={handleChange}
               className={`border border-background-600 rounded-lg py-3 mt-1 px-2 text-text-400 bg-[#F9F6F8] text-xs cursor-pointer outline-none ${inputstyles}`}
            />

            {previewField.value && (
               <div className='relative mt-2 h-32 w-32'>
                  <Image
                     src={previewField.value}
                     alt="Preview"
                     width={128}
                     height={128}
                     className="w-full h-full object-cover rounded-lg border"
                  />
                  <X onClick={() => {
                     setFieldValue(name, null);
                     URL.revokeObjectURL(previewField.value);
                     previewHelpers.setValue(null);
                     if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                     }
                  }}
                     className='absolute right-1 top-1 cursor-pointer' />
               </div>
            )}
         </div>
         {meta.touched && meta.error && <p className="text-red-500 text-xs -mt-1">{meta.error}</p>}
      </div>
   );
};

export default InputFile;
