import { useState, useEffect } from "react";

function useFetch(url) {
  const [res, setRes] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setRes(data);
        if (!data.error) {
          setData(data.data);
        } else {
          setError("Unable to fetch Data");
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { res, data, loading, error };
}

export default useFetch;
