import { useCallback, useState } from 'react';

const useFetch = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = useCallback(async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isLoading, errorMessage, fetchData };
};

export default useFetch;
