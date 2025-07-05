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
   maxFiles?: number;
}

const InputFileMultiple: React.FC<InputFileProps> = ({
   label,
   styles,
   inputstyles,
   accept = 'image/*',
   name,
   previewFieldSuffix = 'Preview',
   required,
   maxFiles = 10,
}) => {
   const [field, meta] = useField(name);
   const previewFieldName = `${name}${previewFieldSuffix}`;
   const [previewField, , previewHelpers] = useField(previewFieldName);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const { setFieldValue } = useFormikContext();

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.currentTarget.files;
      if (files && files.length > 0) {
         const fileArray = Array.from(files);

         // Check if adding new files would exceed maxFiles limit
         const currentFiles = field.value || [];
         const totalFiles = currentFiles.length + fileArray.length;

         if (totalFiles > maxFiles) {
            alert(`You can only upload a maximum of ${maxFiles} files.`);
            return;
         }

         // Update files field - append new files to existing ones
         const updatedFiles = [...currentFiles, ...fileArray];
         setFieldValue(name, updatedFiles);

         // Create preview URLs for new files
         const currentPreviews = previewField.value || [];
         const newPreviews = fileArray.map(file => URL.createObjectURL(file));
         const updatedPreviews = [...currentPreviews, ...newPreviews];

         previewHelpers.setValue(updatedPreviews);
      }
   };

   const removeFile = (index: number) => {
      const currentFiles = field.value || [];
      const currentPreviews = previewField.value || [];

      // Revoke the object URL for the removed file
      if (currentPreviews[index] && typeof currentPreviews[index] === 'string') {
         URL.revokeObjectURL(currentPreviews[index]);
      }

      // Remove file and preview at the specified index
      const updatedFiles = currentFiles.filter((_: unknown, i: number) => i !== index);
      const updatedPreviews = currentPreviews.filter((_: unknown, i: number) => i !== index);

      setFieldValue(name, updatedFiles.length > 0 ? updatedFiles : null);
      previewHelpers.setValue(updatedPreviews.length > 0 ? updatedPreviews : null);

      // Clear the input value to allow re-selecting the same files
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   };

   const clearAllFiles = () => {
      // Revoke all object URLs
      if (previewField.value) {
         previewField.value.forEach((preview: string) => {
            if (typeof preview === 'string') {
               URL.revokeObjectURL(preview);
            }
         });
      }

      setFieldValue(name, null);
      previewHelpers.setValue(null);

      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   };

   useEffect(() => {
      if (field.value && !previewField.value) {
         if (Array.isArray(field.value)) {
            // Handle array of files
            const previews = field.value.map((file: File | string) => {
               if (typeof file === 'string') {
                  return file;
               } else if (file instanceof File) {
                  return URL.createObjectURL(file);
               }
               return null;
            }).filter(Boolean);

            previewHelpers.setValue(previews);
         }
      }

      // Cleanup function to revoke object URLs
      return () => {
         if (previewField.value && Array.isArray(previewField.value)) {
            previewField.value.forEach((preview: string) => {
               if (typeof preview === 'string') {
                  URL.revokeObjectURL(preview);
               }
            });
         }
      };
   }, [field.value, previewField.value, previewHelpers]);

   const fileCount = field.value ? field.value.length : 0;

   return (
      <div>
         <div className={`${styles} flex flex-col gap-1 mb-3`}>
            <label className="flex items-center gap-1" htmlFor={name}>
               <p className="typography-regular-small text-primary-900">{label}</p>
               {required && <p className="text-error">*</p>}
               {fileCount > 0 && (
                  <span className="text-xs text-gray-500">({fileCount}/{maxFiles})</span>
               )}
            </label>
            <input
               id={name}
               ref={fileInputRef}
               multiple
               type="file"
               accept={accept}
               onChange={handleChange}
               className={`border border-background-600 rounded-lg py-3 mt-1 px-2 text-text-400 bg-[#F9F6F8] text-xs cursor-pointer outline-none ${inputstyles}`}
            />

            {/* Preview Grid */}
            {previewField.value && previewField.value.length > 0 && (
               <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                     <p className="text-xs text-gray-600">
                        {previewField.value.length} file{previewField.value.length > 1 ? 's' : ''} selected
                     </p>
                     <button
                        type="button"
                        onClick={clearAllFiles}
                        className="text-xs text-red-500 hover:text-red-700"
                     >
                        Clear All
                     </button>
                  </div>
                  <div className="flex items-center gap-4">
                     {previewField.value.map((preview: string, index: number) => (
                        <div key={index} className="relative h-24 w-24">
                           <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover rounded-lg border"
                           />
                           <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                           >
                              <X size={12} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
         {meta.touched && meta.error && <p className="text-red-500 text-xs -mt-1">{meta.error}</p>}
      </div>
   );
};

export default InputFileMultiple;