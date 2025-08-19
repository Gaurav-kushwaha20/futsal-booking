'use client';
import { endpoints } from '@/constant/endpoints.constant';
import { useGetDataQuery } from '@/service/api';
import { IGetFutsalSuccess } from '../interface/IGetFutsals';
import { useState } from 'react';

const useFutsals = () => {
 const [page, setPage] = useState<number>(0);
 const [pageSize, setPageSize] = useState<number>(5);
 const [search, setSearch] = useState<string>('');
 const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

 // Access the location from browser api
 const handleGetRecommendations = () => {
  if (!('geolocation' in navigator)) {
   alert('Geolocation is not supported by this device');
   return;
  }
  navigator.geolocation.getCurrentPosition(
   (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('User lat and long:', latitude, longitude);
    setCoords({ lat: latitude, lon: longitude });
   },
   (error) => {
    console.error('Error fetching location', error);
    alert('Unable to fetch location. Please allow location access');
   }
  );
 };

 const { data, isError, isLoading, isSuccess } = useGetDataQuery({
  url: endpoints.getAllFutsal,
  params: { page: page, pageSize: pageSize, search: search, latitude: coords?.lat || '', longitude: coords?.lon || '', radius: 3 },
 });

 const futsalList: IGetFutsalSuccess = data;
 return { futsalList, isError, isLoading, isSuccess, page, setPage, pageSize, setPageSize, search, setSearch, handleGetRecommendations };
};

export default useFutsals;
