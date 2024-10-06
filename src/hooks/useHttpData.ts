import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    axios
      .get<{ meals: T[] }>(url, { signal })
      .then(({ data }) => {
        if (!ignore) {
          setData(data.meals);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error("Error fetching data:", err);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data, setData, setLoading };
}
