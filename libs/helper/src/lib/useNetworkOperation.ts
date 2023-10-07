"use client";
import { useCallback, useMemo, useState } from "react";

type T_FetchResponse = {
  message: unknown,
  error: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useNetworkOperation = (url: string, onSuccess: (data: any) => void) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const status = useMemo(() => {
    if (loading) {
      return 'loading';
    }
    if (error) {
      return 'error';
    }
    if(success) {
      return 'success';
    }
    return 'idle';
  }, [loading, success, error]);

  const run = useCallback((body: string) => {
    setLoading(true);
    const method = body ? 'POST' : 'GET';
    fetch(url, { method, body })
      .then(response => response.json())
      .then(({message, error}: T_FetchResponse) => {
        console.log({message, error});
        onSuccess(message);
        setError(error);
        if (message && !error) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return {
    run,
    error,
    loading,
    status,
  };
};
