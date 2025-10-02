import { useState, useCallback } from 'react';
import axios from 'axios';

export default function useFetchRadio() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    axios
      .get(url)
      .then((response) => {
        setData(response.data.results || response.data);
      })
      .catch((err) => setError(err)) 
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error, fetchApi };
}
