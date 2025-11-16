import { useCallback, useEffect, useState } from "react";

/**
 * apiCall(param) => { call: Promise(axiosResponse), controller: AbortController }
 * options = { autoFetch?: boolean, params?: any }
 */
export const useApi = (apiCall, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = useCallback((param) => {
    const { call, controller } = apiCall(param);
    setLoading(true);

    call
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [apiCall]);

  useEffect(() => {
    if (options?.autoFetch) {
      const cleanup = fetch(options.params);
      return cleanup;
    }
  }, [fetch, options?.autoFetch, options?.params]);

  return { loading, data, error, fetch };
};
