import { useEffect, useState } from "react";

export default function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    asyncFn()
      .then((res) => { if (alive) setData(res); })
      .catch((err) => { if (alive) setError(err); })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, deps);

  return { data, loading, error };
}
