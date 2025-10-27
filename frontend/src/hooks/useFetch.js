import { useEffect, useState } from "react";

export default function useFetch(asyncBuilder, deps = []) {
  const [data, setData]   = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    const { promise, abort } = asyncBuilder();

    Promise.resolve(promise)
      .then((res) => alive && setData(res))
      .catch((err) => alive && setError(err))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
      abort?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const friendlyError = error ? (error.message || "Não foi possível carregar os dados.") : null;

  return { data, loading, error: friendlyError, rawError: error };
}
