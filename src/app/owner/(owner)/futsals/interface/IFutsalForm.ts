export interface IFutsalForm {
 name: string;
 district: string;
 city: string;
 registrationNumber: string;
 logitude: string;
 latitude: string;
 images: File[] | null | string[];
 coverImage: File | null | string;
 registrationPhoto: File | null | string;
}
