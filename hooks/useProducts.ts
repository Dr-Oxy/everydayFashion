import { axiosRequest } from '@/utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

//define env
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const orgId = process.env.EXPO_PUBLIC_ORGID;
const appId = process.env.EXPO_PUBLIC_APPID;

export const useGetProducts = () => {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      axiosRequest().get(
        `/products?organization_id=${orgId}&reverse_sort=false&size=10&Appid=${appId}&Apikey=${apiKey}`,
      ),
  });

  return query;
};

export const useGetProductById = (id: string | string[] | undefined) => {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      axiosRequest().get(
        `/products/${id}?organization_id=${orgId}&Appid=${appId}&Apikey=${apiKey}`,
      ),
  });

  return query;
};
