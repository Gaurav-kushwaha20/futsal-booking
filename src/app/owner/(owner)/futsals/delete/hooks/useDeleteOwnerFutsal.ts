'use client';
import { apiTags, endpoints } from '@/constant/endpoints.constant';
import { useDeleteDataMutation } from '@/service/api';
import { showErrorMessage, showSuccessMessage } from '@/service/toast.services';
import { useParams } from 'next/navigation';

export const useDeleteOwnerFutsal = async () => {
 const params = useParams<{ slug: string }>();
 console.log(params.slug);

 const [deleteFutsal, { isError: isDeleteError, isLoading: isErrorLoading, isSuccess: isDeleteSuccess }] = useDeleteDataMutation();
 // Delete the futsal
 const deleteRes = await deleteFutsal({
  url: endpoints?.owner?.deleteFutsal + params.slug,
  invalidates: [apiTags.ownerGetAllFutsals],
 });
 if (deleteRes?.data) showSuccessMessage(deleteRes?.data?.message);
 if (deleteRes?.error) showErrorMessage('failed to delete');

 return {};
};
