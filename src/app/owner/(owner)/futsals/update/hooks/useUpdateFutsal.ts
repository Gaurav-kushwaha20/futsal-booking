import { useGetDataQuery, useUpdatePutDataMutation } from "@/service/api";
import { IFutsalForm } from "../../interface/IFutsalForm";
import { apiTags, endpoints } from "@/constant/endpoints.constant";
import { useFormik } from "formik";
import { IGetFutsalDetails } from "../interface/IGetFutsalDetails";
import { showErrorMessage, showSuccessMessage } from "@/service/toast.services";
import { useRouter } from "next/navigation";
import { PATH } from "@/constant/PATH.constant";

interface IProps {
    id: string;
}

export const useUpdateFutsal = ({ id }: IProps) => {
    const { data } = useGetDataQuery<{ data: IGetFutsalDetails }>({
        url: endpoints.owner.getFutsalsDetails + id,
    });

    const router = useRouter();

    const [updateFutsal, {isLoading }] = useUpdatePutDataMutation();

    const initialValues: IFutsalForm = {
        name: data?.data?.name || "",
        city: data?.data?.city || "",
        coverImage: data?.data?.converImage || "",
        district: data?.data?.district || "",
        images: data?.data?.images || null,
        logitude: data?.data?.location?.x.toString() || "",
        latitude: data?.data?.location?.y.toString() || "",
        registrationNumber: data?.data?.registrationNumber || "",
        registrationPhoto: data?.data?.registrationPhoto || null,
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const form = new FormData();


            // append registration Photo
            // if (values.registrationPhoto) {
            //  form.append("registration_photo", values.registrationPhoto);
            // }

            // append cover photo
            if (values.coverImage && values.coverImage instanceof File) {
                form.append("cover_image", values.coverImage);
            }

            // append images
            if (values.images) {
                values.images?.forEach((file) => {
                    if (file instanceof File) {
                        form.append("images", file);
                    }
                });
            }

            // append data
            // Append data as JSON string with proper content type
            const data = new Blob(
                [
                    JSON.stringify({
                        name: values?.name,
                        district: values?.district,
                        city: values?.city,
                        registrationNumber: values?.registrationNumber,
                        location: {
                            type: "point",
                            coordinates: [values.logitude, values.latitude],
                        },
                    }),
                ],
                { type: "application/json" }
            );

            form.append("data", data);

            //   Send the data to the backend

            const response = await updateFutsal({
                url: endpoints.owner.updateFutsal + id,
                data: form,
                invalidateTag: [apiTags.ownerGetAllFutsals],
            });

            if (response.data) {
                showSuccessMessage(response?.data?.message);
                formik.resetForm()
                router.push(PATH.owner.updateFutsal)
            }
            else showErrorMessage("Some error occured");
        },
    });

    return { formik , isLoading };
};
