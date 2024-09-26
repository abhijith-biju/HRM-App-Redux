import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { API } from '.';

const useApi = <T,>(
    method: string,
    url: string,
    params?: AxiosRequestConfig
) => {
    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);
    const [refreshIndex, setRefreshIndex] = useState(0);

    const refresh = () => {
        setRefreshIndex((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response: AxiosResponse<T> = await API({
                    method,
                    url,
                    ...params,
                });

                if (!cancelled) {
                    setResponse(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err as AxiosError);
                    setLoading(false);
                }
            }
        };
        let cancelled = false;
        fetchData();

        return () => {
            cancelled = true;
        };
    }, [refreshIndex, url]);

    return { response, loading, error, refresh };
};

export default useApi;
